param(
    [string]$Model = "lumina-core:latest",
    [string]$Prompt = "State three concise facts about Lumina privacy.",
    [int]$Runs = 3,
    [string]$Endpoint = "http://127.0.0.1:11434/api/generate",
    [int]$TimeoutSeconds = 240,
    [int]$NumThread = ([Math]::Max([Environment]::ProcessorCount - 1, 1)),
    [int]$NumCtx = 2048,
    [int]$NumPredict = 256,
    [double]$Temperature = 0.2,
    [switch]$Warmup
)

$ErrorActionPreference = "Stop"

if ($Runs -lt 1) {
    throw "Runs must be at least 1."
}

$logicalProcessors = [Environment]::ProcessorCount
$httpClient = [System.Net.Http.HttpClient]::new()
$httpClient.Timeout = [TimeSpan]::FromSeconds($TimeoutSeconds)
$results = @()

function Get-OllamaSnapshot {
    $processes = Get-Process -Name ollama -ErrorAction SilentlyContinue
    if (-not $processes) {
        return [pscustomobject]@{
            CpuSeconds = 0
            WorkingSetMb = 0
        }
    }

    return [pscustomobject]@{
        CpuSeconds = ($processes | Measure-Object -Property CPU -Sum).Sum
        WorkingSetMb = [math]::Round((($processes | Measure-Object -Property WorkingSet64 -Sum).Sum / 1MB), 2)
    }
}

function New-RequestBody([string]$ModelName, [string]$PromptText) {
    return @{
        model = $ModelName
        prompt = $PromptText
        stream = $true
        options = @{
            num_thread = $NumThread
            num_ctx = $NumCtx
            num_predict = $NumPredict
            temperature = $Temperature
        }
    } | ConvertTo-Json -Depth 8
}

if ($Warmup) {
    Write-Host "Running warmup request..."
    $warmBody = New-RequestBody -ModelName $Model -PromptText $Prompt
    [void](Invoke-RestMethod -Method Post -Uri $Endpoint -ContentType 'application/json' -Body $warmBody -TimeoutSec $TimeoutSeconds)
}

for ($i = 1; $i -le $Runs; $i++) {
    $body = New-RequestBody -ModelName $Model -PromptText $Prompt
    $content = [System.Net.Http.StringContent]::new($body, [System.Text.Encoding]::UTF8, 'application/json')
    $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Post, $Endpoint)
    $request.Content = $content

    $before = Get-OllamaSnapshot
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

    try {
        $response = $httpClient.SendAsync($request, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
    } catch {
        throw "Benchmark request failed at run $i. Endpoint: $Endpoint | Model: $Model | TimeoutSeconds: $TimeoutSeconds | Error: $($_.Exception.Message)"
    }

    $response.EnsureSuccessStatusCode() | Out-Null

    $stream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
    $reader = [System.IO.StreamReader]::new($stream)

    $firstTokenMs = $null
    $responseText = ""
    $promptEvalCount = 0
    $evalCount = 0
    $evalDurationNs = 0
    $doneReason = ""

    while (-not $reader.EndOfStream) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }

        $json = $line | ConvertFrom-Json
        if ($null -eq $firstTokenMs -and $json.response) {
            $firstTokenMs = [math]::Round($stopwatch.Elapsed.TotalMilliseconds, 2)
        }
        if ($json.response) {
            $responseText += [string]$json.response
        }
        if ($json.prompt_eval_count) {
            $promptEvalCount = [int]$json.prompt_eval_count
        }
        if ($json.eval_count) {
            $evalCount = [int]$json.eval_count
        }
        if ($json.eval_duration) {
            $evalDurationNs = [double]$json.eval_duration
        }
        if ($json.done_reason) {
            $doneReason = [string]$json.done_reason
        }
    }

    $stopwatch.Stop()
    $reader.Dispose()
    $stream.Dispose()
    $response.Dispose()
    $request.Dispose()
    $content.Dispose()

    $after = Get-OllamaSnapshot
    $totalMs = [math]::Round($stopwatch.Elapsed.TotalMilliseconds, 2)
    if ($evalCount -eq 0) {
        $evalCount = (($responseText -split '\s+') | Where-Object { $_ }).Count
    }
    $tokensPerSecond = if ($evalDurationNs -gt 0 -and $evalCount -gt 0) {
        [math]::Round(($evalCount / ($evalDurationNs / 1e9)), 2)
    } elseif ($totalMs -gt 0 -and $evalCount -gt 0) {
        [math]::Round(($evalCount / ($totalMs / 1000)), 2)
    } else {
        0
    }
    $cpuDelta = [math]::Max(($after.CpuSeconds - $before.CpuSeconds), 0)
    $cpuPercent = if ($totalMs -gt 0) {
        [math]::Round((($cpuDelta / ($totalMs / 1000)) / [math]::Max($logicalProcessors, 1)) * 100, 2)
    } else {
        0
    }

    $results += [pscustomobject]@{
        run = $i
        first_token_ms = if ($null -eq $firstTokenMs) { 0 } else { $firstTokenMs }
        total_ms = $totalMs
        prompt_eval_count = $promptEvalCount
        eval_count = $evalCount
        tokens_per_second = $tokensPerSecond
        ollama_cpu_percent = $cpuPercent
        ollama_working_set_mb = $after.WorkingSetMb
        done_reason = $doneReason
    }
}

$results | Format-Table -AutoSize

$avgFirstToken = [math]::Round((($results | Measure-Object -Property first_token_ms -Average).Average), 2)
$avgTotal = [math]::Round((($results | Measure-Object -Property total_ms -Average).Average), 2)
$avgTps = [math]::Round((($results | Measure-Object -Property tokens_per_second -Average).Average), 2)
$avgCpu = [math]::Round((($results | Measure-Object -Property ollama_cpu_percent -Average).Average), 2)
$peakWs = [math]::Round((($results | Measure-Object -Property ollama_working_set_mb -Maximum).Maximum), 2)

Write-Host ""
Write-Host "Model: $Model"
Write-Host "Endpoint: $Endpoint"
Write-Host "Runs: $Runs"
Write-Host "TimeoutSeconds: $TimeoutSeconds"
Write-Host "num_thread: $NumThread"
Write-Host "num_ctx: $NumCtx"
Write-Host "num_predict: $NumPredict"
Write-Host "temperature: $Temperature"
Write-Host "Average first token (ms): $avgFirstToken"
Write-Host "Average total latency (ms): $avgTotal"
Write-Host "Average tokens/sec: $avgTps"
Write-Host "Average Ollama CPU (% of total logical capacity): $avgCpu"
Write-Host "Peak Ollama working set (MB): $peakWs"