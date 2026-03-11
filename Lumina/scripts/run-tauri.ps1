$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$workspaceRoot = Split-Path -Parent $repoRoot
$aliasPath = Join-Path $workspaceRoot "src-tauri"
$realPath = Join-Path $repoRoot "src-tauri"
$tauriCli = Join-Path $repoRoot "node_modules\.bin\tauri.cmd"
$createdAlias = $false

try {
    if (-not (Test-Path $aliasPath)) {
        New-Item -ItemType Junction -Path $aliasPath -Target $realPath | Out-Null
        $createdAlias = $true
    }

    $env:CARGO_TARGET_DIR = Join-Path $realPath "target"

    if ($args.Count -gt 0) {
        & $tauriCli @args
    } else {
        & $tauriCli
    }

    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}
finally {
    if ($createdAlias -and (Test-Path $aliasPath)) {
        Remove-Item -LiteralPath $aliasPath -Force
    }
}
