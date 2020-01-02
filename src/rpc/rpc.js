const http = require('http');
const logger = require('../utils/logger.js');
const server_consts = require('../../server_api/consts.js');
const configs = require('../utils/configs.js');
const jsonrpc = require('jsonrpc-lite');
const MARCONID_RPC_PATH = "/rpc/m/request";

function SendRPC(remotePort, rpcName, args, callback) {
    let requestObj = jsonrpc.request('1', rpcName, args);
    let options = {
        host: "127.0.0.1",
        port: remotePort,
        path: MARCONID_RPC_PATH,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    };
    let responseString = "";
    let req = http.request(options, function (res) {
        res.on("data", function (data) {
            // save all the data from response
            responseString += data;
        });
        res.on("end", function () {
            callback(responseString);
        });
    });
    req.write(JSON.stringify(requestObj));
    req.on('error', (err) => {
        logger.error("Error: " + err.message);
    });
    req.end();
}

module.exports = {
    SendRPC,
};
