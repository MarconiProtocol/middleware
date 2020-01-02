const ethDataDaemon = require('../src/data_daemon/eth_data_daemon.js')
const server_consts = require('./consts.js')
const configs = require('../src/utils/configs.js')

const Middleware_API = {
  /*
    Subscribe to the middleware for updates from the blockchain
  */
  subscribe: function(args, callback) {
    // id, port, networkContractAddress, pubKeyHash
    ethDataDaemon.Subscribe(
      args["Id"],
      args["Port"],
      args["NetworkContractAddress"],
      args["PubKeyHash"]
    )
    callback(null, "Subscribed")
  },
  /*
    Un-Subscribe to the middleware for updates from the blockchain
  */
  unsubscribe: function(args, callback) {
    // id
    ethDataDaemon.Unsubscribe(
      args["Id"]
    )
    callback(null, "Unsubscribed")
  },
  /*
    Update UserAddress in user_conf.json
  */
  updateUserAddress: function (args, callback) {
    try {
      configs.UpdateUserAddress(args[0])
      callback(null, true)
    } catch (err) {
      callback({
        code: server_consts.ERROR_CODE,
        message: err.message
      })
    }
  }
}

module.exports = Middleware_API
