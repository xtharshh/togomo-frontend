$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$backendDir = Join-Path $repoRoot 'backend'
$venvPython = Join-Path $repoRoot '.venv\Scripts\python.exe'
$envFile = Join-Path $repoRoot '.env'

if (-not (Test-Path $backendDir)) {
  throw "Backend folder not found at $backendDir"
}

$pythonCommand = if (Test-Path $venvPython) { $venvPython } else { 'python' }

$route = Get-NetRoute -AddressFamily IPv4 -DestinationPrefix '0.0.0.0/0' |
  Sort-Object RouteMetric |
  Select-Object -First 1

$lanIp = $null
if ($route) {
  $lanIp = Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $route.InterfaceIndex |
    Where-Object { $_.IPAddress -notlike '169.254.*' -and $_.IPAddress -notlike '127.*' } |
    Select-Object -First 1 -ExpandProperty IPAddress
}

if (-not $lanIp) {
  $lanIp = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -like '192.168.*' -and $_.PrefixOrigin -ne 'WellKnown' } |
    Select-Object -First 1 -ExpandProperty IPAddress
}

$apiUrl = $null
if (Test-Path $envFile) {
  $line = Get-Content $envFile |
    Where-Object { $_ -match '^\s*EXPO_PUBLIC_TOGOMO_API_URL\s*=\s*' } |
    Select-Object -First 1

  if ($line) {
    $apiUrl = ($line -split '=', 2)[1].Trim()
  }
}

Write-Host 'Starting TOGOMO backend for Expo Go...'
if ($lanIp) {
  Write-Host "Detected LAN IP: $lanIp"
  Write-Host "Expected mobile URL: http://${lanIp}:8000"
} else {
  Write-Host 'No 192.168.x.x LAN IP detected. Make sure Wi-Fi is connected.'
}

if ($apiUrl) {
  Write-Host "Configured EXPO_PUBLIC_TOGOMO_API_URL: $apiUrl"
  if ($lanIp -and $apiUrl -notmatch [regex]::Escape("http://${lanIp}:8000")) {
    Write-Warning "Your .env URL does not match current LAN IP. Update .env to http://${lanIp}:8000"
  }
} else {
  Write-Warning 'EXPO_PUBLIC_TOGOMO_API_URL is not set in .env'
  if ($lanIp) {
    Write-Host "Add this line to .env: EXPO_PUBLIC_TOGOMO_API_URL=http://${lanIp}:8000"
  }
}

Write-Host ''
Write-Host 'Health check URL for phone browser:'
if ($lanIp) {
  Write-Host "http://${lanIp}:8000/health/"
} else {
  Write-Host 'http://YOUR_PC_IP:8000/health/'
}
Write-Host ''

Set-Location $backendDir
& $pythonCommand manage.py runserver 0.0.0.0:8000
