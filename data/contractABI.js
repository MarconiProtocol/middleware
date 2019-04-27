const NetworkManagerContractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "name": "pubKeyHash",
        "type": "string"
      },
      {
        "name": "macHash",
        "type": "string"
      },
      {
        "name": "timeOfRegister",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "DEFAULT_NETWORK_NAME",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "networks",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "RELEASE_VERSION",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "pubKeyHash",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "macHash",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "networkContract",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "NetworkCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "NetworkDeleted",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      },
      {
        "name": "_macHash",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUserCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "createNetwork",
    "outputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_targetNetworkId",
        "type": "uint256"
      }
    ],
    "name": "deleteNetwork",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNetworkCount",
    "outputs": [
      {
        "name": "_count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "pubKeyHash",
        "type": "string"
      }
    ],
    "name": "getUserMacHash",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

const NetworkContractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "active",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pubKeyHashMine",
        "type": "string"
      },
      {
        "name": "_pubKeyHashOther",
        "type": "string"
      }
    ],
    "name": "addPeerRelation",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_enable",
        "type": "bool"
      }
    ],
    "name": "updateNetworkState",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNetworkId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDataJSON",
    "outputs": [
      {
        "name": "ret",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      }
    ],
    "name": "getPeerInfo",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      }
    ],
    "name": "getPeerRelations",
    "outputs": [
      {
        "name": "ret",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getPeerCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      },
      {
        "name": "_pubKeyHashOther",
        "type": "string"
      }
    ],
    "name": "removePeerRelation",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "IP_SUFFIX",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      }
    ],
    "name": "addPeer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "IP_OFFSET",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newAdmin",
        "type": "address"
      }
    ],
    "name": "transferNetworkAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "id",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "MAX_PEER_CAPACITY",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "peers",
    "outputs": [
      {
        "name": "networkId",
        "type": "uint256"
      },
      {
        "name": "pubKeyHash",
        "type": "string"
      },
      {
        "name": "macHash",
        "type": "string"
      },
      {
        "name": "ip",
        "type": "string"
      },
      {
        "name": "active",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "IP_PREFIX",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getPeers",
    "outputs": [
      {
        "name": "ret",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "RELEASE_VERSION",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getReleaseVersion",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_pubKeyHash",
        "type": "string"
      }
    ],
    "name": "removePeer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNetworkAdmin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_admin",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pubKeyHash",
        "type": "string"
      }
    ],
    "name": "PeerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pubKeyHash",
        "type": "string"
      }
    ],
    "name": "PeerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pubKeyHashMine",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "pubKeyHashOther",
        "type": "string"
      }
    ],
    "name": "PeerRelationAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "networkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "pubKeyHashMine",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "pubKeyHashOther",
        "type": "string"
      }
    ],
    "name": "PeerRelationRemoved",
    "type": "event"
  }
]

module.exports = {
  NetworkManagerContractABI,
  NetworkContractABI,
}
