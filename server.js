const express = require('express')
const configs = require('./src/utils/configs.js')
const logger = require('./src/utils/logger.js')

const bodyParser = require('body-parser')
const jayson = require('jayson')

const ethDataDaemon = require('./src/data_daemon/eth_data_daemon.js')

const Middleware_API = require('./server_api/middleware.js')
const Personal_API = require('./server_api/personal.js')
const Eth_API = require('./server_api/eth.js')
const Marconi_API = require('./server_api/marconi.js')

const app = express()

function StartServer() {
  var serverConfig = configs.GetServerConfig();

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.post('/api/middleware/v1', jayson.server(Middleware_API).middleware());
  app.post('/api/eth/v1', jayson.server(Eth_API).middleware());
  app.post('/api/personal/v1', jayson.server(Personal_API).middleware());
  app.post('/api/marconi/v1', jayson.server(Marconi_API).middleware());

  app.listen(serverConfig.RPC_Port, () => {
    logger.info("Starting Marconi Middleware on Port: " + serverConfig.RPC_Port);
  });
}

StartServer();
ethDataDaemon.StartDataDaemon();
