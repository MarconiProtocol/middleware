const marconiNet = require('../src/marconi_net/marconi_web3js.js')
const server_consts = require('./consts.js')

// The personal api only really makes sense if the keystore is imported
const Personal_API = {
  /*
    Unlock the provided account
  */
  personal_unlockAccount: function(args, callback) {
    // address, password, duration
    marconiNet.UnlockAccount(args[0], args[1], parseInt(args[2], 10))
      .then(function(result) {
        callback(null, result)
      }, function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  }
}

module.exports = Personal_API
