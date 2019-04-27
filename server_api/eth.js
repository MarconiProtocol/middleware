const marconiNet = require('../src/marconi_net/marconi_web3js.js')
const server_consts = require('./consts.js')

const Eth_API = {
  /*
    Get current balance of an account (in wei)
  */
  eth_getBalance: function(args, callback) {
    // address
    marconiNet.GetBalance(args[0])
      .then(function(result) {
        callback(null, "0x" + parseInt(result).toString(16))
      }, function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  },
  /*
    Get current block number
  */
  eth_blockNumber: function(args, callback) {
    marconiNet.BlockNumber()
      .then(function(result) {
        callback(null, "0x" + result.toString(16))
      }, function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  },
  /*
    Sign data with provided account
  */
  eth_sign: function(args, callback) {
    // data, address
    marconiNet.Sign(args[0], args[1])
      .then(function(result) {
        callback(null, result.toString())
      }, function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  },
  /*
    Send a rlp encoded signed transaction
  */
  eth_sendRawTransaction: function(args, callback) {
    // rlp encoded signed transaction
    marconiNet.SendSignedTransaction(args[0])
      .once('transactionHash', function(hash) {
        callback(null, hash)
      })
  },
  /*
    Get the receipt for a transaction by transaction hash
  */
  eth_getTransactionReceipt: function(args, callback) {
    marconiNet.GetTransactionReceipt(args[0])
      .then(function(result) {
        result.blockNumber = result.blockNumber.toString(16)
        result.cumulativeGasUsed = result.cumulativeGasUsed.toString(16)
        result.gasUsed = result.gasUsed.toString(16)
        result.transactionIndex = result.transactionIndex.toString(16)
        callback(null, result)
      }, function(err) {
        callback(err, null)
      })
      .catch(function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  },
  /*
    Send a transaction
  */
  eth_sendTransaction: function(args, callback) {
    marconiNet.SendTransaction(args[0])
      .then(function(result) {
        callback(null, result)
      }, function(err) {
        console.error(err)
        callback({
          code: server_consts.ERROR_CODE,
          message: err.message
        })
      })
  },
  /*
    Get the number of transactions sent by address
  */
  eth_getTransactionCount: function(args, callback) {
    // address
    marconiNet.GetTransactionCount(args[0])
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

module.exports = Eth_API
