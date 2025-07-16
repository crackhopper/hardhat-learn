curl localhost:8545 \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{"method":"debug_traceTransaction","params":["0x6473cd24c6bad9e3873b52528f42a1a1a7b09be28f3037cb24ecaa866b34a3a6"], "id":1,"jsonrpc":"2.0"}' > output.json