const http = require('http');

// TODO: replace with gRPC / or other non marconi specific rpc mechanism
function SendRPC(remotePort, rpcType, rpcPayload, completeCallback) {
  var url = "http://127.0.0.1:" + remotePort + "/rpc/m/request?m="

  // build rpcPayload
  var payload = rpcType + "#M#" + "someInfoHash" + rpcType + "#M#" + rpcPayload
  var encodedPayload = Buffer.from(payload).toString('base64')
  url = url + encodedPayload

  console.log("==> SENDING RPC; " + rpcType + ": " + url)

  http.get(url, (resp) => {
    resp.on('end', () => {
      completeCallback(this.responseText)
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

module.exports = {
  SendRPC
}
