$outputPath = "output.json"
$jsonContent = (Invoke-WebRequest `
    -Uri http://localhost:8545 `
    -Method POST `
    -Headers @{"Content-Type" = "application/json"} `
    -Body '{"method":"debug_traceTransaction","params":["0x6473cd24c6bad9e3873b52528f42a1a1a7b09be28f3037cb24ecaa866b34a3a6"], "id":1,"jsonrpc":"2.0"}' 
).Content

$utf8NoBomEncoding = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($outputPath, $jsonContent, $utf8NoBomEncoding)
