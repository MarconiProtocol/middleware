/*
   Web3 interface to ethereum json API.
*/
const Web3 = require('web3');

const logger = require('../utils/logger.js')
const configs = require('../utils/configs.js')
const ABI = require('../../data/contractABI.js')

const methConfig = configs.GetMethConfig()
const userMethConfig = configs.GetUserMethConfig()
const web3 = new Web3(new Web3.providers.HttpProvider(methConfig.RPC_Host + ":" + methConfig.RPC_Port));
const networkManagerContract = new web3.eth.Contract(ABI.NetworkManagerContractABI, methConfig.NetworkManagerSCAddress)
const Rpc = require('../rpc/rpc.js')

logger.info("Using " + methConfig.NetworkManagerSCAddress + " as NetworkManager")

// ===== M-Ethereum =======================================

/*
  Unlock an account
*/
function UnlockAccount(address, password, duration) {
  logger.info("Received request to Unlock account for " + address)
  return web3.eth.personal.unlockAccount(address, password, duration)
}

/*
  Get the balance of the users account, in ether
*/
function GetBalance(address) {
  logger.info("Received request to get account balance for " + address)
  return web3.eth.getBalance(address)
}

/*
  Get the current block number
*/
function BlockNumber() {
  logger.info("Received request to retrieve current block number")
  return web3.eth.getBlockNumber()
}

/*
  Sign data using specified account
*/
function Sign(data, address) {
  logger.info("Received request to sign data " + data + " using account " + address)
  return web3.eth.sign(data, address)
}

/*
  Send a transaction
*/
function SendTransaction(transactionObj) {
  logger.info("Received request to send transaction %o", transactionObj)
  return web3.eth.sendTransaction(transactionObj)
}

/*
  Send a signed transaction
*/
function SendSignedTransaction(transactionRlp) {
  logger.info("Received request to send signed transaction %o", transactionRlp)
  return web3.eth.sendSignedTransaction(transactionRlp)
}

/*
  Get the receipt for a transaction by transaction hash
*/
function GetTransactionReceipt(transactionHash) {
  logger.info("Received request to get transaction receipt for " + transactionHash)
  return web3.eth.getTransactionReceipt(transactionHash)
}

/*
  Get the number of transactions sent from this address
*/
function GetTransactionCount(address) {
  logger.info("Received request to get transaction count for account " + address)
  return web3.eth.getTransactionCount(address)
}

// ===== Marconi Network =======================================

/*
  Get the release version of the NetworkManagerContract
*/
function ReleaseVersionNetworkManager() {
  return networkManagerContract.methods.RELEASE_VERSION().call()
}

function sendMethod(method, fromAddress) {
  if (fromAddress == null) {
    fromAddress = userMethConfig.UserAddress
  }

  return method.send({
    from: fromAddress,
    gas: methConfig.DefaultGas
  })
}

/*
  Register with the main NetworkManagerContract
*/
function RegisterUser(pubKeyHash, macHash, fromAddress) {
  logger.info("Received request to register User %o", {'pubKeyHash': pubKeyHash, 'macHash': macHash, 'address': fromAddress})
  return sendMethod(networkManagerContract.methods.registerUser(pubKeyHash, macHash), fromAddress)
}

/*
  Deploy a new NetworkContract through the main NetworkManagerContract
*/
function CreateNetwork(fromAddress) {
  logger.info("Received request to deploy new NetworkContract from " + fromAddress)
  return sendMethod(networkManagerContract.methods.createNetwork(), fromAddress)
}

/*
  Destroys an existing NetworkContract
*/
function DestroyNetwork(networkId, fromAddress) {
  logger.info("Received request to destroy network with id " + networkId)
  return sendMethod(networkManagerContract.methods.deleteNetwork(networkId), fromAddress)
}

function getNetworkContract(networkContractAddress) {
  logger.info("Received request to retrieve Network Contract for address " + networkContractAddress)
  return new web3.eth.Contract(ABI.NetworkContractABI, networkContractAddress)
}

/*
  Get the release version of the NetworkContract
*/
function ReleaseVersionNetwork(networkContractAddress) {
  logger.info("Received request for release version of NetworkContract")
  return getNetworkContract(networkContractAddress).methods.RELEASE_VERSION().call()
}

/*
  Add a peer to a particular NetworkContract, this peer does not yet have peer relationships
*/
function AddPeer(networkContractAddress, peerPubKeyHash, fromAddress) {
  logger.info("Received request to add peer %o ", {'networkContractAddress': networkContractAddress, 'peerPublicKeyHash': peerPubKeyHash, 'fromAddress': fromAddress})
  return sendMethod(getNetworkContract(networkContractAddress).methods.addPeer(peerPubKeyHash), fromAddress)
}

/*
  Remove a peer from a particular NetworkContract, which also removes all of its relationships
*/
function RemovePeer(networkContractAddress, peerPubKeyHash, fromAddress) {
  logger.info("Received request to remove peer %o", {'networkContractAddress': networkContractAddress, 'peerPublicKeyHash': peerPubKeyHash, 'fromAddress': fromAddress})
  return sendMethod(getNetworkContract(networkContractAddress).methods.removePeer(peerPubKeyHash), fromAddress)
}

/*
  Add a peer relationship to a particular NetworkContract, if no peer exists, the contract will add the peer
*/
function AddPeerRelationship(networkContractAddress, peerPubKeyHash, otherPeerPubKeyHash, fromAddress) {
  logger.info("Received request to add peer relationship %o", {'networkContract': networkContractAddress, 'peerOne': peerPubKeyHash, 'peerTwo': otherPeerPubKeyHash, 'fromAddress': fromAddress})
  return sendMethod(getNetworkContract(networkContractAddress).methods.addPeerRelation(peerPubKeyHash, otherPeerPubKeyHash), fromAddress)
}

/*
  Remove a peer relationship from a particular NetworkContract
*/
function RemovePeerRelationship(networkContractAddress, peerPubKeyHash, otherPeerPubKeyHash, fromAddress) {
  logger.info("Received request to remove peer relationship %o", {'networkContract': networkContractAddress, 'peerOne': peerPubKeyHash, 'peerTwo': otherPeerPubKeyHash, 'fromAddress': fromAddress})
  return sendMethod(getNetworkContract(networkContractAddress).methods.removePeerRelation(peerPubKeyHash, otherPeerPubKeyHash), fromAddress)
}

/*
  Get the peers for a particular peer on a marconi subnetwork, as defined in a NetworkContract
*/
function GetPeerRelations(networkContractAddress, pubKeyHash) {
  logger.info("Received request to retrieve peer relations %o", {'networkContract': networkContractAddress, 'peer': pubKeyHash})
  return getNetworkContract(networkContractAddress).methods.getPeerRelations(pubKeyHash).call()
}

/*
  Get a peer's information in a NetworkContract
*/
function GetPeerInfo(networkContractAddress, pubKeyHash) {
  logger.info("Received request to retrieve peer information for %o", {'networkContract': networkContractAddress, 'peer': pubKeyHash})
  return getNetworkContract(networkContractAddress).methods.getPeerInfo(pubKeyHash).call()
}

/*
  Get a peer's information in a NetworkContract
*/
function GetPeers(networkContractAddress) {
  logger.info("Received request for peers of " + networkContractAddress)
  return getNetworkContract(networkContractAddress).methods.getPeers().call()
}

/*
  Get the network id of a NetworkContract
*/
function GetNetworkId(networkContractAddress) {
  logger.info("Received request for network id of " + networkContractAddress)
  return getNetworkContract(networkContractAddress).methods.getNetworkId().call()
}

/*
  Get the network admin of a NetworkContract
*/
function GetNetworkAdmin(networkContractAddress) {
  logger.info("Received request for network admin of " + networkContractAddress)
  return getNetworkContract(networkContractAddress).methods.getNetworkAdmin().call()
}

/*
  Get all the info of the network contract in JSON format.
 */
function GetDataJSON(networkContractAddress) {
  logger.info("Received request for network contract information for " + networkContractAddress)
  return getNetworkContract(networkContractAddress).methods.getDataJSON().call()
}

module.exports = {
  UnlockAccount,
  GetBalance,
  BlockNumber,
  Sign,
  SendTransaction,
  SendSignedTransaction,
  GetTransactionReceipt,
  GetTransactionCount,
  ReleaseVersionNetworkManager,
  ReleaseVersionNetwork,
  RegisterUser,
  CreateNetwork,
  DestroyNetwork,
  AddPeer,
  RemovePeer,
  AddPeerRelationship,
  RemovePeerRelationship,
  GetPeerRelations,
  GetPeerInfo,
  GetPeers,
  GetNetworkId,
  GetNetworkAdmin,
  GetDataJSON,
}
