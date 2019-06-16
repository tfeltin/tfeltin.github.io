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

function getGas(fcall, inputs){
	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			console.log("Error while estimating gas price");
			console.log(e);
		} else {
			gasPrice = gasPrice.c[0];
			fcall.estimateGas(inputs, {from: web3.eth.defaultAccount}, (e, gas) => {
				if (!e){
					console.log("Error while estimating gas");
					console.log(e);
				} else {
					return(gas, gasPrice);
				});
		});
}

function userAddData(){
  const ipfsAddress = document.getElementById("ipfs_address").value;
	var gas, gasPrice = getGas(contract.userAddData, {_ipfsAddress: ipfsAddress});
	console.log(gas);
	console.log(gasPrice);
	const tx = {
	  from: web3.eth.defaultAccount,
	  gas: gas,
	  gasPrice: gasPrice
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
	var gas, gasPrice = getGas(contract.spAddData, {_ipfsAddress: ipfsAddress, userAddress:userAddress});
	console.log(gas);
	console.log(gasPrice);
	const tx = {
		from: fromAccount,
		gas: gas,
		gasPrice: gasPrice
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
