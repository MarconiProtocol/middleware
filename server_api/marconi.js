const util = require('./utils');
const logger = require('../src/utils/logger.js');
const marconiNet = require('../src/marconi_net/marconi_web3js.js');
const server_consts = require('./consts.js');
const rpc = require('../src/rpc/rpc.js');

const Marconi_API = {
    /*
      Get the release version of the Network Manager contract
    */
    releaseVersionNetworkManager: function (args, callback) {
        let ret = marconiNet.ReleaseVersionNetworkManager()
        ret.then((result) => {
            callback(null, {
                releaseVersion: result
            })
        });
    },
    /*
      Register public key hash to the Marconi Network
    */
    registerUser: function (args, callback) {
        let ret = marconiNet.RegisterUser(args["PubKeyHash"], args["MacHash"], args["FromAddress"])
        listenForErrorNoBookkeeping(ret, callback)

        ret.once('receipt', function (receipt) {
            userRegisteredEvent = receipt.events.UserRegistered
            if (userRegisteredEvent != null) {
                callback(null, {
                    pubKeyHash: userRegisteredEvent.returnValues.pubKeyHash,
                    macHash: userRegisteredEvent.returnValues.macHash
                })
            }
        })
    },
    /*
      Create a new Marconi Subnet
    */
    createNetwork: function (args, callback) {
        let ret = marconiNet.CreateNetwork(args["FromAddress"])
        listenForErrorNoBookkeeping(ret, callback)

        ret.once('receipt', function (receipt) {
            networkCreatedEvent = receipt.events.NetworkCreated
            if (networkCreatedEvent != null) {
                callback(null, {
                    networkId: networkCreatedEvent.returnValues.networkId,
                    networkContract: networkCreatedEvent.returnValues.networkContract,
                    admin: networkCreatedEvent.returnValues.admin
                })
            }
        })
    },
    /*
      Delete a Marconi Subnet
    */
    deleteNetwork: function (args, callback) {
        let ret = marconiNet.DestroyNetwork(args["NetworkId"], args["FromAddress"])
        listenForErrorNoBookkeeping(ret, callback)

        ret.once('receipt', function (receipt) {
            networkDeletedEvent = receipt.events.NetworkDeleted
            if (networkDeletedEvent != null) {
                callback(null, {
                    networkId: networkDeletedEvent.returnValues.networkId,
                    admin: networkDeletedEvent.returnValues.admin
                })
            }
        })
    },
    /*
    Get the release version of the Network contract
  */
    releaseVersionNetwork: function (args, callback) {
        let ret = marconiNet.ReleaseVersionNetwork(args["NetworkContractAddress"])
        ret.then((result) => {
            callback(null, {
                releaseVersion: result
            })
        });
    },
    /*
      Add a peer to a Marconi Subnet, without any relationships
    */
    addPeer: function (args, callback) {
        let waitForReceipt = false
        if (args["WaitForReceipt"] !== undefined) {
            waitForReceipt = args["WaitForReceipt"]
        }
        let ret = marconiNet.AddPeer(args["NetworkContractAddress"], args["PeerPubKeyHash"], args["FromAddress"])
        var has_callback_been_called = {
            val: false
        }; // See comment in listenForError function.
        listenForError(ret, callback, has_callback_been_called)

        if (waitForReceipt) {
            ret.once('receipt', function (receipt) {
                peerAddedEvent = receipt.events.PeerAdded
                if (peerAddedEvent != null) {
                    callback(null, {
                        networkId: peerAddedEvent.returnValues.networkId,
                        pubKeyHash: peerAddedEvent.returnValues.pubKeyHash
                    })
                }
            })
        } else {
            listenForTransactionHash(ret, callback, has_callback_been_called)
        }
    },
    /*
      Remove a peer from a Marconi Subnet
    */
    removePeer: function (args, callback) {
        let waitForReceipt = false
        if (args["WaitForReceipt"] !== undefined) {
            waitForReceipt = args["WaitForReceipt"]
        }
        let ret = marconiNet.RemovePeer(args["NetworkContractAddress"], args["PeerPubKeyHash"], args["FromAddress"])
        var has_callback_been_called = {
            val: false
        }; // See comment in listenForError function.
        listenForError(ret, callback, has_callback_been_called)

        if (waitForReceipt) {
            ret.once('receipt', function (receipt) {
                peerRemovedEvent = receipt.events.PeerRemoved
                if (peerRemovedEvent != null) {
                    callback(null, {
                        networkId: peerRemovedEvent.returnValues.networkId,
                        pubKeyHash: peerRemovedEvent.returnValues.pubKeyHash
                    })
                }
            })
        } else {
            listenForTransactionHash(ret, callback, has_callback_been_called)
        }
    },
    /*
      Add a peer relationship to a Marconi Subnet
    */
    addPeerRelation: function (args, callback) {
        let waitForReceipt = false
        if (args["WaitForReceipt"] !== undefined) {
            waitForReceipt = args["WaitForReceipt"]
        }
        let ret = marconiNet.AddPeerRelationship(args["NetworkContractAddress"], args["PeerPubKeyHash"], args["OtherPeerPubKeyHash"], args["FromAddress"])
        var has_callback_been_called = {
            val: false
        }; // See comment in listenForError function.
        listenForError(ret, callback, has_callback_been_called)

        if (waitForReceipt) {
            ret.once('receipt', function (receipt) {
                peerRelationAddedEvent = receipt.events.PeerRelationAdded
                if (peerRelationAddedEvent != null) {
                    callback(null, {
                        networkId: peerRelationAddedEvent.returnValues.networkId,
                        pubKeyHashMine: peerRelationAddedEvent.returnValues.pubKeyHashMine,
                        pubKeyHashOther: peerRelationAddedEvent.returnValues.pubKeyHashOther
                    })
                }
            })
        } else {
            listenForTransactionHash(ret, callback, has_callback_been_called)
        }
    },
    /*
      Remove a peer relationship from a Marconi Subnet, note this removes the peer relation from both nodes
    */
    removePeerRelation: function (args, callback) {
        let waitForReceipt = false
        if (args["WaitForReceipt"] !== undefined) {
            waitForReceipt = args["WaitForReceipt"]
        }
        let ret = marconiNet.RemovePeerRelationship(args["NetworkContractAddress"], args["PeerPubKeyHash"], args["OtherPeerPubKeyHash"], args["FromAddress"])
        var has_callback_been_called = {
            val: false
        }; // See comment in listenForError function.
        listenForError(ret, callback, has_callback_been_called)

        if (waitForReceipt) {
            ret.once('receipt', function (receipt) {
                peerRelationRemovedEvent = receipt.events.PeerRelationRemoved
                if (peerRelationRemovedEvent != null) {
                    callback(null, {
                        networkId: peerRelationRemovedEvent.returnValues.networkId,
                        pubKeyHashMine: peerRelationRemovedEvent.returnValues.pubKeyHashMine,
                        pubKeyHashOther: peerRelationRemovedEvent.returnValues.pubKeyHashOther
                    })
                }
            })
        } else {
            listenForTransactionHash(ret, callback, has_callback_been_called)
        }
    },
    /*
      Fetch a peer's peer relationships in a Marconi Subnet
    */
    getPeerRelations: function (args, callback) {
        marconiNet.GetPeerRelations(args["NetworkContractAddress"], args["PubKeyHash"])
            .then(function (result) {
                callback(null, result)
            })
            .catch(function (err) {
                logger.error(err)
                callback({
                    code: server_consts.ERROR_CODE,
                    message: err.message
                })
            })
    },
    /*
      Fetch a peer's information in a Marconi Subnet
    */
    getPeerInfo: function (args, callback) {
        marconiNet.GetPeerInfo(args["NetworkContractAddress"], args["PubKeyHash"])
            .then(function (result) {
                callback(null, result)
            })
            .catch(function (err) {
                logger.error(err)
                callback({
                    code: server_consts.ERROR_CODE,
                    message: err.message
                })
            })
    },
    /*
      Fetch the peers list of a Marconi Subnet
    */
    getPeers: function (args, callback) {
        marconiNet.GetPeers(args["NetworkContractAddress"])
            .then(function (result) {
                callback(null, result)
            })
            .catch(function (err) {
                logger.error(err)
                callback({
                    code: server_consts.ERROR_CODE,
                    message: err.message
                })
            })
    },
    /*
      Get the network id of a Marconi Subnet
    */
    getNetworkId: function (args, callback) {
        marconiNet.GetNetworkId(args["NetworkContractAddress"])
            .then(function (result) {
                callback(null, result)
            })
            .catch(function (err) {
                logger.error(err)
                callback({
                    code: server_consts.ERROR_CODE,
                    message: err.message
                })
            })
    },
    /*
      Get the network admin of a Marconi Subnet
    */
    getNetworkAdmin: function (args, callback) {
        marconiNet.GetNetworkAdmin(args["NetworkContractAddress"])
            .then(function (result) {
                callback(null, result)
            })
            .catch(function (err) {
                logger.error(err);
                callback({
                    code: server_consts.ERROR_CODE,
                    message: err.message
                })
            })
    },
    /*
    Get all the network info in JSON format
    */
    getDataJSON: function (args, callback) {
        marconiNet.GetDataJSON(args["NetworkContractAddress"])
            .then(function (result) {
                callback(null, result);
            })
            .catch(function (err) {
                logger.error(err);
                callback({
                    code: server_consts.error_code,
                    message: err.message
                })
            })
    },
    /*
      Start netflow on marconid
    */
    startNetflow: function (args, callback) {
        console.log("Starting netflow on localhost", args);
        let requiredParams = ["collectorIp", "collectorPort", "interface", "loggingDirectory"];
        let missingParameters = util.GetMissingParameters(requiredParams, args);
        if (missingParameters.length !== 0) {
            callback({
                code: server_consts.ERROR_CODE,
                message: "Some of required parameters collectorIp and collectorPort were not defined: " + missingParameters.toString()
            });
        } else {
            let startNetflowArgs = {
                IP: args["collectorIp"],
                Port: args["collectorPort"],
                BridgeId: args["interface"],
                LoggingDir: args["loggingDirectory"]
            };
            rpc.SendRPC(24802, "NetflowService.StartNetflowRPC", startNetflowArgs, (err, res) => {
                if (err != null) {
                    callback({
                        code: server_consts.ERROR_CODE,
                        message: err
                    })
                } else {
                    callback(err, res);
                }
            });
        }
    }
};


// This variation of listenForError just always assumes it's safe to
// call the callback. Contrast it with the version below.
function listenForErrorNoBookkeeping(ret, callback) {
    ret.once('error', function (err) {
        logger.error(err);
        callback({
            code: server_consts.ERROR_CODE,
            message: err.message
        })
    })
}

function listenForError(ret, callback, has_callback_been_called) {
    ret.once('error', function (err) {
        logger.error(err);
        // In some cases, for example when the user runs "peer remove" on
        // a peer that doesn't exist in the network, both a
        // 'transactionHash' event will occur, as well as an 'error' event
        // roughly 15 to 30 seconds later (when the EVM decides it doesn't
        // like the transaction). Therefore we have to be careful to only
        // call 'callback' once (the first time), because if we call it
        // twice then the middleware process will die with the error
        // "Can't set headers after they are sent."
        if (has_callback_been_called.val == false) {
            callback({
                code: server_consts.ERROR_CODE,
                message: err.message
            })
            has_callback_been_called.val = true
        }
    })
}

function listenForTransactionHash(ret, callback, has_callback_been_called) {
    ret.once('transactionHash', function (hash) {
        if (has_callback_been_called.val == false) {
            callback(null, {
                transactionHash: hash
            })
            has_callback_been_called.val = true
        }
    })
}


module.exports = Marconi_API
