# Overview
The middleware is a bridge layer between multiple Marconi software components. This bridge layer gives us added flexibility to iterate on the various components or switch out dependencies with a higher degree of freedom. An example of this is when we eventually replace the blockchain layer with our own implementation.

# Quick Links
- [Running](#running-middleware)  
- [API](#json-rpc-api)

# Running Middleware
Middleware is a node.js project and can be run with the following commands:  
```
npm install   // install packages middleware depends on
npm start     // run the project
```


# JSON RPC API
The API to interface with the middleware. Subscribers are expected to receive information back through an rpc call.

[Marconi-Network](#marconi-network)
- [releaseVersionNetworkManager](#releaseversionnetworkmanager)
- [releaseVersionNetwork](#releaseversionnetwork)
- [registerUser](#register)
- [createNetwork](#createnetwork)
- [deleteNetwork](#deletenetwork)
- [addPeer](#addpeer)
- [removePeer](#removepeer)
- [addPeerRelation](#addpeerrelation)
- [removePeerRelation](#removepeerrelation)
- [getPeerRelations](#getpeerrelations)
- [getPeerInfo](#getpeerinfo)
- [getPeers](#getpeers)
- [getNetworkAdmin](#getnetworkadmin)
- [getDataJson](#getdatajson)

[Marconi-Ethereum](#marconi-ethereum)
- [eth_getBalance](#eth_getbalance)
- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)

[Middleware](#middleware)
- [subscribe](#subscribe)



## Marconi-Network

### releaseVersionNetworkManager
Get the release version of the global NetworkManager contract  

**Result**  
Object
- releaseVersion: `STRING` - The release version  

**Example**  
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method":"releaseVersionNetworkManager", "params":{}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "releaseVersion":"1"
    }
}
```
***
&nbsp;


### releaseVersionNetwork
Get the release version of the Network contract

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to get the release version for

**Result**  
Object
- releaseVersion: `STRING` - The release version

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "releaseVersionNetwork", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "releaseVersion":"1"
    }
}
```
***
&nbsp;


### registerUser  
Registers the pub key hash to the Marconi Network.  

**Params**  
[PubKeyHash] `STRING` - The public key hash of the peer to be registered with the Marconi Network

**Result**  
Object
- pubKeyHash: `STRING` - Public key hash of the peer that was added

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "registerUser", "params":{"PubKeyHash":"d337147677f56e93f3da8f3e863c098a8410a444", "MacHash":"7c:67:a2:e9:99:f4"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "pubkeyhash": "d337147677f56e93f3da8f3e863c098a8410a444"
    }
}
```
***
&nbsp;

### createNetwork
Create a new Marconi subnet  

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- networkContract: `STRING` - Address of the network contract that was deployed for the new network
- admin: `STRING` - The address of the owner of the network contract

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "createNetwork", "params":{}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "networkContract": "0x165A4E0641Dd2849303f26B1c917Adf07428C072",
        "admin": "5bb80f07ea71f9a28b5c0bc3b55af5ffcb351d8c
    }
}
```
***
&nbsp;

### deleteNetwork
Deletes a Marconi subnet  

**Params**  
[NetworkId] `STRING` - The id of the network contract to delete

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- admin: `STRING` - The address of the owner of the deleted network contract

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "deleteNetwork", "params":{}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "admin": "5bb80f07ea71f9a28b5c0bc3b55af5ffcb351d8c
    }
}
```
***
&nbsp;


### addPeer
Adds a peer to a Marconi subnet, without any relationships

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which a peer will be added  
[PeerPubKeyHash] `STRING` - The public key hash of the peer being added  
[WaitForReceipt] `BOOLEAN` - Whether to wait for transaction to be mined and receipt available (optional, default to false)

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- pubKeyHash: `STRING` - Public key hash of the peer that was added

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "addPeer", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PeerPubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444", "WaitForReceipt": true}}' 127.0.0.1:28902/api/marconi/v1

// Result with Receipt
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "pubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444"
    }
}
// Result with Transaction Hash
{
    "id":"1",
    "jsonrpc":"2.0",
    "result":{
        "transactionHash": "0x2ea4a3cd817a66e62647b68c8ff004807ad75cc66906a49d44d46e752b8d598a"
    }
}
```
***
&nbsp;

### removePeer
Removes a peer to a Marconi subnet

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which a peer will be removed from  
[PeerPubKeyHash] `STRING` - The public key hash of the peer being removed  
[WaitForReceipt] `BOOLEAN` - Whether to wait for transaction to be mined and receipt available (optional, default to false)

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- pubKeyHash: `STRING` - Public key hash of the peer that was removed

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "removePeer", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PeerPubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444", "WaitForReceipt": "true"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "pubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444"
    }
}
```
***
&nbsp;


### addPeerRelation  
Adds a one way peer relationship to a Marconi subnet, in relation to the first peer

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which a relationship will be added  
[PeerPubKeyHash] `STRING` - Public key hash of the peer for whom we are adding a relationship  
[OtherPeerPubKeyHash] `STRING` - The public key hash of the other peer  
[WaitForReceipt] `BOOLEAN` - Whether to wait for transaction to be mined and receipt available (optional, default to false)

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- pubKeyHashMine: `STRING` - Public key hash of the peer for whom we are adding a relationship
- pubKeyHashOther: `STRING` - Public key hash of the other peer

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "addPeerRelation", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PeerPubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444", "OtherPeerPubKeyHash": "f1185b7ca3a0a7978a6c17171a15fbcc96af27cb", "WaitForReceipt": "true"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "pubKeyHashMine": "d337147677f56e93f3da8f3e863c098a8410a444",
        "pubKeyHashOther": "f1185b7ca3a0a7978a6c17171a15fbcc96af27cb"
    }
}
```
***
&nbsp;


### removePeerRelation  
Removes a two way peer relationship to a Marconi subnet, relation from both nodes are removed

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which a relationship will be removed  
[PeerPubKeyHash] `STRING` - Public key hash of peer #1  
[OtherPeerPubKeyHash] `STRING` - Public key hash of peer #2  
[WaitForReceipt] `BOOLEAN` - Whether to wait for transaction to be mined and receipt available (optional, default to false)

**Result**  
Object
- networkId : `STRING` - The identifier of the network
- pubKeyHash: `STRING` - Public key hash of peer #1
- pubKeyHashNeighbor: `STRING` - Public key hash of peer #2

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "removePeerRelation", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PeerPubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444", "OtherPeerPubKeyHash": "f1185b7ca3a0a7978a6c17171a15fbcc96af27cb", "WaitForReceipt": true}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "networkId": "18",
        "pubKeyHashMine": "d337147677f56e93f3da8f3e863c098a8410a444",
        "pubKeyHashOther": "f1185b7ca3a0a7978a6c17171a15fbcc96af27cb"
    }
}
```
***
&nbsp;


### getPeerRelations
Fetches a peer's peers in a Marconi subnet

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which the peer has relationships  
[PubKeyHash] `STRING` - The public key hash of the peer we are querying for relationships  

**Result**  
`STRING` - A comma separated string of public key hash values of each peer

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "getPeerRelations", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"f1185b7ca3a0a7978a6c17171a15fbcc96af27cb,9c9ac4e84651b836ad3f8dde5ae4716054a241dc,5bb80f07ea71f9a28b5c0bc3b55af5ffcb351d8c"
}
```
***
&nbsp;


### getPeerInfo
Fetches all information of a peer

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to which the peer has relationships  
[PubKeyHash] `STRING` - The public key hash of the peer we are querying for relationships  

**Result**  
`Array` - An array of 5 elements: Network id, PubKeyHash, Peers, IP, Active

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "getPeerInfo", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072", "PubKeyHash": "d337147677f56e93f3da8f3e863c098a8410a444"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "0":"1",
        "1":"d337147677f56e93f3da8f3e863c098a8410a444",
        "2":"f1185b7ca3a0a7978a6c17171a15fbcc96af27cb,9c9ac4e84651b836ad3f8dde5ae4716054a241dc,5bb80f07ea71f9a28b5c0bc3b55af5ffcb351d8c",
        "3":"10.27.16.1/24",
        "4":true
    }
}
```
***
&nbsp;

### getPeers 
Fetch the peers list of a Marconi Subnet

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract from which to fetch peers  

**Result**  
`String` - A comma delimited string of peers in the Marconi subnet

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "getPeers", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"2be20ac5ce8c57ade93fdf3ee34e2ca6165dd551,e56fb56d8a91bf792e2f9951f25bdc2488a0fd9d,65be5dceef958f147cd8d1e3fd94c3b5b03ea304"
}
```
***
&nbsp;

### getNetworkAdmin
Get the network admin of a Marconi Subnet

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract from which to fetch peers

**Result**  
DATA 20 Bytes - address of admin who created the network contract

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "getNetworkAdmin", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0xA511B03FDE1c99f1b7b161698f82fbF37451bFb3"
}
```
***
&nbsp;

### getDataJSON
Get the network info in JSON format

**Params**  
[NetworkContractAddress] `STRING` - The address of the network contract to get JSON data from

**Result**  
`STRING` - JSON string representation of Network contract data

**Example**
```
// Request
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "id":1, "method": "getDataJSON", "params":{"NetworkContractAddress":"0x165A4E0641Dd2849303f26B1c917Adf07428C072"}}' 127.0.0.1:28902/api/marconi/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"{ \"networkId\": \"0\", \"admin\": \"0xa511b03fde1c99f1b7b161698f82fbf37451bfb3\", \"networkManager\": \"0x496066113b249f4d4817b040fdf8cdad3cd2122a\", \"active\": true, \"peers\": [{\"pubKeyHash\": \"2be20ac5ce8c57ade93fdf3ee34e2ca6165dd551\", \"macHash\": \"\", \"ip\": \"10.27.16.10/24\", \"neighbors\": [\"2be20ac5ce8c57ade93fdf3ee34e2ca6165dd551\", \"e56fb56d8a91bf792e2f9951f25bdc2488a0fd9d\"\", \"65be5dceef958f147cd8d1e3fd94c3b5b03ea304\"]}, {\"pubKeyHash\": \"e56fb56d8a91bf792e2f9951f25bdc2488a0fd9d\", \"macHash\": \"\", \"ip\": \"10.27.16.11/24\", \"neighbors\": [\"2be20ac5ce8c57ade93fdf3ee34e2ca6165dd551\", \"e56fb56d8a91bf792e2f9951f25bdc2488a0fd9d\"\", \"65be5dceef958f147cd8d1e3fd94c3b5b03ea304\"]}, {\"pubKeyHash\": \"65be5dceef958f147cd8d1e3fd94c3b5b03ea304\", \"macHash\": \"\", \"ip\": \"10.27.16.12/24\", \"neighbors\": [\"2be20ac5ce8c57ade93fdf3ee34e2ca6165dd551\", \"e56fb56d8a91bf792e2f9951f25bdc2488a0fd9d\"\", \"65be5dceef958f147cd8d1e3fd94c3b5b03ea304\"]}] }"
}
```
***
&nbsp;


## Marconi-Ethereum

#### Marconi-Ethereum Parameter types
The data types follows ethereum's JSON RPC API

When encoding `QUANTITIES` (integers, numbers): encode as hex, prefix with "0x", the most compact representation (slight exception: zero should be represented as "0x0"). Examples:

    0x41 (65 in decimal)
    0x400 (1024 in decimal)
    WRONG: 0x (should always have at least one digit - zero is "0x0")
    WRONG: 0x0400 (no leading zeroes allowed)
    WRONG: ff (must be prefixed 0x)

When encoding `UNFORMATTED DATA` (byte arrays, account addresses, hashes, bytecode arrays): encode as hex, prefix with "0x", two hex digits per byte. Examples:

    0x41 (size 1, "A")
    0x004200 (size 3, "\0B\0")
    0x (size 0, "")
    WRONG: 0xf0f0f (must be even number of digits)
    WRONG: 004200 (must be prefixed 0x)

***
&nbsp;

### eth_getBalance
Returns the balance of a given wallet address.

**Params**  
[0] `DATA` 20 Bytes - The wallet address to check balance for

**Result**  
`QUANTITY` - Wallet balance in wei

**Example**
```
// Request
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id":1, "method":"eth_getBalance", "params":["0x3304bcac9d4a67c4f9c6b0af9b05907d98fe3d9e"]}' 127.0.0.1:28902/api/eth/v1

// Returns
{
    "jsonrpc":"2.0",
    "id":1,
    "result": "0x41e175c3ee6a9400000" // 19444551543211000070144
}
```
***
&nbsp;


### eth_blockNumber
Returns the latest block number.

**Result**  
`QUANTITY` - Block number

**Example**
```
// Request
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id":20, "method":"eth_blockNumber"}' 127.0.0.1:28902/api/eth/v1

// Returns
{
    "jsonrpc":"2.0",
    "id":1,
    "result": "0x1bae" // 7086
}
```
***
&nbsp;


### eth_sendRawTransaction
Sends a signed transaction.

**Params**  
[0] `DATA` The signed transaction data (RLP encoded)

**Result**  
`DATA` 32 Bytes - The transaction hash, or zero hash if the transaction has not been included in a block.

**Example**
```    
// Request
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id":2, "method":"eth_sendRawTransaction", "params":["0xf8660382c35082c350943304bcac9d4a67c4f9c6b0af9b05907d98fe3d9e822710808304ea29a044b8787001d13d0e5bec8c68b70f95f0a0af8141e6eb072179152199a78869a8a0607866b2588f0c11a98f2627c8f8761eb07504de99f1d70cff18c842d23519e2"]}' 127.0.0.1:28902/api/eth/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```
***
&nbsp;


### eth_getTransactionReceipt
Return the transaction receipt for the given transaction by transaction hash.

**Params**  
[0] `DATA` 32 Bytes - Transaction hash

**Result**  
Object - A transaction receipt object or null
- blockHash: `DATA` 32 Bytes - hash of block containing this transaction
- blockNumber: `QUANTITY` - block number of block containing this transaction
- contractAddress: `DATA` 20 Bytes - address of created contract if contract creation transaction, else null
- cumulativeGasUsed: `QUANTITY` - total gas used in the block at the time this transaction was executed
- from: `DATA` 20 Bytes - address of the sender
- gasUsed: `QUANTITY` - amount of gas used by this transaction
- logs: `Array` - array of log objects created by this transaction
- logsBloom: `DATA` 256 Bytes - bloom filter used by light clients to quickly get logs related to this transaction
- to: `DATA` 20 Bytes - address of the receiver, null if this was a contract creation transaction
- transactionHash: `DATA` 32 Bytes - hash of transaction
- transactionIndex: `QUANTITY` - index of transaction in block
- status: `QUANTITY` success or failure (1/0)

**Example**
```
// Request
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id":"1", "method":"eth_getTransactionReceipt", "params":["0x0d04e21bf37bb0eee9ae1b9554409658ec6768c2863afb5d929d5441bc21e523"]}' 127.0.0.1:28902/api/eth/v1

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "blockHash":"0x153ef4e61cf983b3bed630964807905cde4b02708d441de4d765ed79e69dea6c",
        "blockNumber":3022,
        "contractAddress":null,
        "cumulativeGasUsed":"0x5208", //21000
        "from":"0x6d029c3c151226c892199f9a725326d8b0da8611",
        "gasUsed":"0x5208", //21000
        "logs":[],
        "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "root":"0xa02ca9f574982d37c7bf86e1a78e92915934e2cad9989585ca323c9f92261619",
        "to":"0x3304bcac9d4a67c4f9c6b0af9b05907d98fe3d9e",
        "transactionHash":"0x0d04e21bf37bb0eee9ae1b9554409658ec6768c2863afb5d929d5441bc21e523",
        "transactionIndex":0
    }
}
```
***
&nbsp;

## Middleware

### subscribe
As described above, subscribes to the middleware.

**Params**  
[Id] `STRING` - An identifier for the subscriber  
[Port] `STRING` - The port to reply back on  
[NetworkContractAddress] `DATA` 20 Bytes - The address of the network contract to subscribe to events for  
[PubKeyHash] `STRING` - The pub key has for the peer we want information for  

**Result**  
`String` - "Subscribed" or Error

**Example**
```
// Request
curl -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id":1, "method":"subscribe", "params":{"Id":"1", "Port": "32010", "NetworkContractAddress": "0x6d029c3c151226c892199f9a725326d8b0da8611", "PubKeyHash": "65be5dceef958f147cd8d1e3fd94c3b5b03ea304"}}' 127.0.0.1:28902/api/middleware/v1

// Result
"Subscribed"
```
***
&nbsp;

