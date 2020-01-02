const Web3 = require('web3');

const configs = require('../utils/configs.js')
const Rpc = require('../rpc/rpc.js')
const logger = require('../utils/logger.js')
const marconiNet = require('../marconi_net/marconi_web3js.js')

// Use 15 second interval, it is half our expected block time
const DAEMON_INTERVAL_MS = 15 * 1000

var subscribers = new Map();
var daemon = null;

// Run Deamon function on an interval
function StartDataDaemon() {
  if (daemon == null) {
    daemon = setInterval(Daemon, DAEMON_INTERVAL_MS)
  }
}

// Stub daemon, could add more tasks in the future if needed
function Daemon() {
  FetchFromEth();
}

// Make a call to GetPeers in our marconi_net interface
function FetchFromEth() {
  subscribers.forEach((subscriber, id, map) => {
    marconiNet.GetPeerInfo(subscriber.networkContractAddress, subscriber.pubKeyHash)
        .then(function(peerInfo) {
          // peerInfo is a 5 element array: [NetworkId, pubKeyHash, peerRelations, IP, active]
          logger.info("Updating and Notifying Subscriber " + id)
          UpdateAndNotifySubscriber(id, subscriber, peerInfo[2], peerInfo[3], peerInfo[4], false)
        })
        .catch(function(error) {
          logger.error(error)
          UpdateAndNotifySubscriber(id, subscriber, "", "", false, true)
        })
  })
}

// Subscribe with the eth data daemon.
// Subscribers are responded to with a http rpc for now
function Subscribe(subscriberId, port, _networkContractAddress, _pubKeyHash, response) {
  // subscribers data object
  subscriberObj = {
    rpcPort: port,
    networkContractAddress: _networkContractAddress,
    pubKeyHash: _pubKeyHash,
    peers: null
  }
  subscribers.set(subscriberId, subscriberObj)
  logger.info('subscribed peer: %o', subscriberObj)
}

// Remove a subscriber from the subscribed list
function Unsubscribe(subscriberId, response) {
  var result = subscribers.delete(subscriberId)
  if (result) {
    logger.info("un-subscribed subscriber with id " + subscriberId)
  }
}

// Update our local cache of the subscribers peers list,
// Notify the peer through an http rpc call
function UpdateAndNotifySubscriber(subscriberId, subscriber, peers, ip, active, error) {
  subscribers.set(subscriberId, subscriber)
  // TODO: if rpc fails, we need to make sure on the next update, the peer is updated
  let updatePeersArgs = {
    PeersList:peers,
    DHCP: ip,
    Active: active,
    ErrorCode: error
  };
  Rpc.SendRPC(24802, "BlockchainRPC.UpdatePeers", updatePeersArgs, (args) => {
    logger.info("Sent notification RPC to subscriber " + subscriberId + " at " + subscriber.rpcPort)
  })
}

module.exports = {
  Subscribe,
  Unsubscribe,
  StartDataDaemon,
}
