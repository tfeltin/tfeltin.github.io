const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "userAddData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsAddress",
				"type": "string"
			},
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "spAddData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "askForAccess",
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
		"constant": true,
		"inputs": [],
		"name": "getMyData",
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
				"name": "_ipfsAddress",
				"type": "string"
			},
			{
				"name": "thirdParty",
				"type": "address"
			}
		],
		"name": "revokeAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsAddress",
				"type": "string"
			},
			{
				"name": "thirdParty",
				"type": "address"
			}
		],
		"name": "grantAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function addUserData(){
  var ipfsAddress = document.getElementById("ipfs_address").value;
  console.log(ipfsAddress);
  cont = window.web3.eth.contract(JSON.parse(abi));
  contract = cont.at("0x745ab2309831426178cea408672fae1160beb996");
	console.log(contract);
}

function addSPData(){
  var ipfsAddress = document.getElementById("ipfs_user_address").value;
	var userAddress = document.getElementById("user_eth_address").value;
  console.log(ipfsAddress);
  console.log(userAddress);
  cont = window.web3.eth.contract(JSON.parse(abi));
  contract = cont.at("0x745ab2309831426178cea408672fae1160beb996");
	console.log(contract);
}

document.getElementById("useraddbutton").addEventListener("click", addUserData);
document.getElementById("spadduserdatabutton").addEventListener("click", addSPData);
