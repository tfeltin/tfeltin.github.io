const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileID",
				"type": "bytes32"
			},
			{
				"name": "_thirdParty",
				"type": "address"
			},
			{
				"name": "_policyType",
				"type": "uint32"
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
				"name": "_fileID",
				"type": "bytes32"
			},
			{
				"name": "_thirdParty",
				"type": "address"
			},
			{
				"name": "_policyType",
				"type": "uint32"
			}
		],
		"name": "grantAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileID",
				"type": "bytes32"
			},
			{
				"name": "_mapAddress",
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
				"name": "_token",
				"type": "bytes32"
			},
			{
				"name": "_fileID",
				"type": "bytes32"
			}
		],
		"name": "validateToken",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "_fileID",
				"type": "bytes32"
			},
			{
				"name": "_policyType",
				"type": "uint32"
			}
		],
		"name": "getToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileID",
				"type": "bytes32"
			},
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_mapAddress",
				"type": "string"
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
		"inputs": [],
		"name": "getMapAddress",
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
		"name": "getMyData",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
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
				"name": "_fileID",
				"type": "bytes32"
			}
		],
		"name": "getTokenCall",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0xe4f109d5e2b70ef022a0c2bf4eace08a85e46199".toLowerCase();
document.getElementById('contAdd').innerHTML = contractAddress;
const $myDataloc = document.querySelector('#myDataloc');
const cont = window.web3.eth.contract(abi);
const contract = cont.at(contractAddress);

const options = {
	EXPERIMENTAL: {
		pubsub: true
	},
	config: {
		Addresses: {
			Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
		}
	}
}

node = new window.Ipfs(options);

node.once('start', () => {
	var fi = new File(["[]"], "mapAddress.json");
	node.add({path: "mapAddress.json", content: fi},{wrapWithDirectory:true});
	node.id().then((id) => document.getElementById('nodeId').innerHTML = id.id);
});


function downloadableFile(map, fileID) {
	var ipfsAddress = map.get(fileID);
	node.ls(ipfsAddress).then((info)=>{
		const row = document.createElement('tr')

	  const nameCell = document.createElement('td')
	  nameCell.innerHTML = info[0].name;

	  const sizeCell = document.createElement('td')
	  sizeCell.innerText = info[0].size;

	  const hashCell = document.createElement('td')
	  hashCell.innerHTML = fileID

	  const copyCell = document.createElement('td')
	  const link = document.createElement('a')

	  link.innerHTML = '<img width=20 class="table-action" src="assets/copy.svg" alt="Copy" />'
		link.addEventListener("click", () => {
			console.log("copy ", fileID)
			var el = document.createElement('textarea');
		  el.value = fileID;
		  el.setAttribute('readonly', '');
		  el.style = {position: 'absolute', left: '-9999px'};
		  document.body.appendChild(el);
		  el.select();
			document.execCommand('copy');
		  document.body.removeChild(el);
		})
	  copyCell.appendChild(link)
		row.appendChild(nameCell)
		row.appendChild(sizeCell)
	  row.appendChild(hashCell)
	  row.appendChild(copyCell)

		$myDataloc.insertBefore(row, $myDataloc.firstChild);
		document.getElementById('empty-row').style.display = 'none';
	});
}

async function setup(){
  // setup web3 and connect to MetaMask
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    await ethereum.enable();
    web3.eth.defaultAccount = web3.eth.accounts[0];
    document.getElementById('address').innerHTML = web3.eth.defaultAccount;
		contract.getMapAddress.call((call_err, mapAddress) => {
			if(!call_err){
				node.get(mapAddress).then((mapStr) => {
					var map = new Map(JSON.parse(mapStr[1].content.toString()));
					contract.getMyData.call((e,myData) => {
			      if (!e){
							for (i=0;i<myData.length;i++){
								downloadableFile(map, myData[i]);
			        }
						}else{
							console.log(e);
						}
					});
				});
			}else{
				console.log(call_err);
			}
		});
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("rinkeby.infura.io/v3/87c66a413df1470abf86a50b4a8bf555"));
  }

}

setup();
