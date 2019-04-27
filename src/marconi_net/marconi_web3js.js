/*
   Web3 interface to ethereum json API.
*/
const Web3 = require('web3');
const configs = require('../utils/configs.js')
const ABI = require('../../data/contractABI.js')

const methConfig = configs.GetMethConfig()
const web3 = new Web3(new Web3.providers.HttpProvider(methConfig.RPC_Host + ":" + methConfig.RPC_Port));
const networkManagerContract = new web3.eth.Contract(ABI.NetworkManagerContractABI, methConfig.NetworkManagerSCAddress)

// ===== M-Ethereum =======================================

/*
  Unlock an account
*/
function UnlockAccount(address, password, duration) {
  return web3.eth.personal.unlockAccount(address, password, duration)
}

/*
  Get the balance of the users account, in ether
*/
function GetBalance(address) {
  return web3.eth.getBalance(address)
}

/*
  Get the current block number
*/
function BlockNumber() {
  return web3.eth.getBlockNumber()
}

/*
  Sign data using specified account
*/
function Sign(data, address) {
  return web3.eth.sign(data, address)
}

/*
  Send a transaction
*/
function SendTransaction(transactionObj) {
  return web3.eth.sendTransaction(transactionObj)
}

/*
  Send a signed transaction
*/
function SendSignedTransaction(transactionRlp) {
  return web3.eth.sendSignedTransaction(transactionRlp)
}

/*
  Get the receipt for a transaction by transaction hash
*/
function GetTransactionReceipt(transactionHash) {
  return web3.eth.getTransactionReceipt(transactionHash)
}

/*
  Get the number of transactions sent from this address
*/
function GetTransactionCount(address) {
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
    fromAddress = methConfig.UserAddress
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
  return sendMethod(networkManagerContract.methods.registerUser(pubKeyHash, macHash), fromAddress)
}

/*
  Deploy a new NetworkContract through the main NetworkManagerContract
*/
function CreateNetwork(fromAddress) {
  return sendMethod(networkManagerContract.methods.createNetwork(), fromAddress)
}

/*
  Destroys an existing NetworkContract
*/
function DestroyNetwork(networkId, fromAddress) {
  return sendMethod(networkManagerContract.methods.deleteNetwork(networkId), fromAddress)
}

function getNetworkContract(networkContractAddress) {
  return new web3.eth.Contract(ABI.NetworkContractABI, networkContractAddress)
}

/*
  Get the release version of the NetworkContract
*/
function ReleaseVersionNetwork(networkContractAddress) {
  return getNetworkContract(networkContractAddress).methods.RELEASE_VERSION().call()
}

/*
  Add a peer to a particular NetworkContract, this peer does not yet have peer relationships
*/
function AddPeer(networkContractAddress, peerPubKeyHash, fromAddress) {
  return sendMethod(getNetworkContract(networkContractAddress).methods.addPeer(peerPubKeyHash), fromAddress)
}

/*
  Remove a peer from a particular NetworkContract, which also removes all of its relationships
*/
function RemovePeer(networkContractAddress, peerPubKeyHash, fromAddress) {
  return sendMethod(getNetworkContract(networkContractAddress).methods.removePeer(peerPubKeyHash), fromAddress)
}

/*
  Add a peer relationship to a particular NetworkContract, if no peer exists, the contract will add the peer
*/
function AddPeerRelationship(networkContractAddress, peerPubKeyHash, otherPeerPubKeyHash, fromAddress) {
  return sendMethod(getNetworkContract(networkContractAddress).methods.addPeerRelation(peerPubKeyHash, otherPeerPubKeyHash), fromAddress)
}

/*
  Remove a peer relationship from a particular NetworkContract
*/
function RemovePeerRelationship(networkContractAddress, peerPubKeyHash, otherPeerPubKeyHash, fromAddress) {
  return sendMethod(getNetworkContract(networkContractAddress).methods.removePeerRelation(peerPubKeyHash, otherPeerPubKeyHash), fromAddress)
}

/*
  Get the peers for a particular peer on a marconi subnetwork, as defined in a NetworkContract
*/
function GetPeerRelations(networkContractAddress, pubKeyHash) {
  return getNetworkContract(networkContractAddress).methods.getPeerRelations(pubKeyHash).call()
}

/*
  Get a peer's information in a NetworkContract
*/
function GetPeerInfo(networkContractAddress, pubKeyHash) {
  return getNetworkContract(networkContractAddress).methods.getPeerInfo(pubKeyHash).call()
}

/*
  Get a peer's information in a NetworkContract
*/
function GetPeers(networkContractAddress) {
  return getNetworkContract(networkContractAddress).methods.getPeers().call()
}

/*
  Get the network id of a NetworkContract
*/
function GetNetworkId(networkContractAddress) {
  return getNetworkContract(networkContractAddress).methods.getNetworkId().call()
}

/*
  Get the network admin of a NetworkContract
*/
function GetNetworkAdmin(networkContractAddress) {
  return getNetworkContract(networkContractAddress).methods.getNetworkAdmin().call()
}

/*
  Get all the info of the network contract in JSON format.
 */
function GetDataJSON(networkContractAddress) {
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
