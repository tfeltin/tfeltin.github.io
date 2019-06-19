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
const node = new window.Ipfs();

function userAddData(){
	const userFile = document.getElementById("useradd_file");
	console.log(userFile);
	let ipfsAddress;
  node.add(userFile.files[0], { progress: (prog) => console.log(`received: ${prog}`) })
    .then((response) => {
      console.log(response);
      ipfsAddress = response[0].hash;
      console.log(ipfsAddress);
    }).catch((err) => {
      console.error(err)
    });
	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.userAddData.estimateGas(ipfsAddress, {from: web3.eth.defaultAccount}, (err, gas) => {
				if (!err){
					const tx = {
						from: web3.eth.defaultAccount,
						gas: gas,
						gasPrice: gasPrice
					};
					contract.userAddData.sendTransaction(ipfsAddress, tx, (err, result) => {
						if (!err){
							console.log(result);
							var a = document.createElement('a');
							var linkText = document.createTextNode(ipfsAddress);
							a.appendChild(linkText);
							a.href = "http://ipfs.io/ipfs/" + ipfsAddress;
							document.getElementById('useradd_result') = a;
							document.getElementById("useradd_form").reset();
						} else {
							console.log("Error in transaction");
							console.log(err);
						}
					});
				} else {
					console.log("Error while estimating gas");
					console.log(err);
				}
			});
		} else {
			console.log("Error while estimating gas price");
			console.log(e);
		}
	});
}


function spAddData(){
	const userAddress = document.getElementById("user_eth_address").value;
	const spFile = document.getElementById("spadd_file");
	console.log(spFile);
	let ipfsAddress;
  node.add(spFile.files[0], { progress: (prog) => console.log(`received: ${prog}`) })
    .then((response) => {
      console.log(response);
      ipfsAddress = response[0].hash;
      console.log(ipfsAddress);
    }).catch((err) => {
      console.error(err)
    });
	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.spAddData.estimateGas(ipfsAddress, userAddress, {from: web3.eth.defaultAccount}, (err, gas) => {
				if (!err){
					const tx = {
						from: web3.eth.defaultAccount,
						gas: gas,
						gasPrice: gasPrice
					};
					contract.spAddData.sendTransaction(ipfsAddress, userAddress, tx, (err, result) => {
						if (!err){
							console.log(result);
							var a = document.createElement('a');
							var linkText = document.createTextNode(ipfsAddress);
							a.appendChild(linkText);
							a.href = "http://ipfs.io/ipfs/" + ipfsAddress;
							document.getElementById('spadd_result') = a;
							document.getElementById("spadd_form").reset();
						} else {
							console.log("Error in transaction");
							console.log(err);
						}
					});
				} else {
					console.log("Error while estimating gas");
					console.log(err);
				}
			});
		} else {
			console.log("Error while estimating gas price");
			console.log(e);
		}
	});
}


document.getElementById("useraddbutton").addEventListener("click", userAddData);
document.getElementById("spadduserdatabutton").addEventListener("click", spAddData);
