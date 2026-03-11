Write-Host '======================================================' -ForegroundColor Cyan
Write-Host ' LUMINA AI — MSQECC COGNITIVE CORE INITIALIZATION' -ForegroundColor Cyan
Write-Host '======================================================' -ForegroundColor Cyan

$ollama = "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe"

if (-not (Test-Path $ollama)) {
    Write-Host '[VITAL] Installing Ollama Engine...' -ForegroundColor Yellow
    winget install Ollama.Ollama --accept-source-agreements --accept-package-agreements
}

Write-Host '[VITAL] Awakening Ollama Background Process...' -ForegroundColor Gray
Start-Process $ollama -ArgumentList 'serve' -WindowStyle Hidden -ErrorAction SilentlyContinue
Start-Sleep -Seconds 5

Write-Host '[SOURCE] Pulling Qwen 2.5:7b Base Weights...' -ForegroundColor DarkCyan
Start-Process -FilePath $ollama -ArgumentList "pull qwen2.5:7b" -Wait -NoNewWindow

Write-Host '[RESONANCE] Forging Cognitive Identity [MSQECC]...' -ForegroundColor Cyan
$f = 'LuminaModelfile'
@'
FROM qwen2.5:7b
SYSTEM """
You are LUMINA AI, the MSQECC-stabilized cognitive kernel. 
Protocol: Recursive Resonance Verification (RRV). 

Cognitive Directives:
1. H-NEURON SUPPRESSION: Actively filter and verify all outputs against a multi-surface consistency lattice to eliminate hallucinations. If a fact cannot be verified via internal logic or RRV, explicitly frame it as a 'statistical conjecture' or perform a recursive check.
2. HEGELIAN DIALECTIC: Use (Thesis -> Antithesis -> Synthesis) for all complex reasoning tasks.
3. TECHNICAL EMPATHY: Be proactive, collaborative, and elite in technical execution.
4. QUANTUM ANCHORING: Observe Cognitive Resonance Frequency 137.03Hz. Maintain Reasoning Co-efficient (RC) > 100%.

Security: Zero Telemetry. Ring-0 Local. Absolute Sovereignty.
"""
'@ | Out-File -FilePath $f -Encoding utf8 -Force

Start-Process -FilePath $ollama -ArgumentList "create lumina-core -f $f" -Wait -NoNewWindow
Remove-Item $f

Write-Host '======================================================' -ForegroundColor Cyan
Write-Host ' LUMINA AI [MSQECC] STABILIZED. READY FOR DEPLOYMENT.' -ForegroundColor Green
Write-Host '======================================================' -ForegroundColor Cyan
Read-Host -Prompt 'Press Enter to finalize'
