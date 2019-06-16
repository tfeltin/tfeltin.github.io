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
const cont = window.web3.eth.contract(abi);
const contract = cont.at("0x745ab2309831426178cea408672fae1160beb996");

function userAddData(){
  const ipfsAddress = document.getElementById("ipfs_address").value;
	const tx = {
	  from: fromAccount,
	  gas: gasLimit,
	  gasPrice: gasPriceInWei
	};
	contract.userAddData.sendTransaction({_ipfsAddress: ipfsAddress}, tx, (err, result) => {
		if (!err){
			console.log(result);
		} else {
			console.log("Error in transaction")
			console.log(err);
		}
	});
}


function spAddData(){
  const ipfsAddress = document.getElementById("ipfs_user_address").value;
	const userAddress = document.getElementById("user_eth_address").value;
	const tx = {
		from: fromAccount,
		gas: gasLimit,
		gasPrice: gasPriceInWei
	};
	contract.spAddData.sendTransaction({_ipfsAddress:ipfsAddress, userAddress:userAddress}, tx, (err, result) => {
		if (!err){
			console.log(result);
		} else {
			console.log("Error in transaction")
			console.log(err);
		}
	});
}

document.getElementById("useraddbutton").addEventListener("click", userAddData);
document.getElementById("spadduserdatabutton").addEventListener("click", spAddData);
