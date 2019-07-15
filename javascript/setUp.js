const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileID",
				"type": "bytes32"
			}
		],
		"name": "getToken",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"name": "_thirdParty",
				"type": "address"
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
				"name": "_mapAddress",
				"type": "string"
			}
		],
		"name": "setMapAddress",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_token",
				"type": "bytes32"
			}
		],
		"name": "isValidToken",
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
		"name": "mapAddress",
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

const $myDataloc = document.querySelector('#myDataloc');
const cont = window.web3.eth.contract(abi);
const contract = cont.at("0x6d7f251ed3f005f9dc15a6e71b14a74dc5a99515");
const options = {
	EXPERIMENTAL: {
		pubsub: true
	},
	repo: 'ipfs-' + Math.random(),
	config: {
		Addresses: {
			Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
		}
	}
}
const node = new window.Ipfs(options);
node.once('start', () => {
	node.id().then((id) => document.getElementById('nodeId').innerHTML = id.id);
});

function downloadableFile(fileID) {
  const row = document.createElement('tr')

  const fileIDCell = document.createElement('td')
  fileIDCell.innerHTML = fileID

  const downloadCell = document.createElement('td')
  const link = document.createElement('a')
  link.innerHTML = '<img width=20 class="table-action" src="assets/download.svg" alt="Download" />'
  downloadCell.appendChild(link)

  row.appendChild(fileIDCell)
  row.appendChild(downloadCell)

	$myDataloc.insertBefore(row, $myDataloc.firstChild);
	document.getElementById('empty-row').style.display = 'none';
}


async function setup(){
  // setup web3 and connect to MetaMask
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    await ethereum.enable();
    web3.eth.defaultAccount = web3.eth.accounts[0];
    document.getElementById('address').innerHTML = web3.eth.defaultAccount;
    contract.getMyData.call((e,r) => {
      if (!e){
        for (i=0;i<r.length;i++){
//					node.get(hash).then((files) => {
					downloadableFile(r[i]);
//					});
        }
      } else {
        console.log(e);
      }
    })
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("rinkeby.infura.io/v3/87c66a413df1470abf86a50b4a8bf555"));
  }

}

setup();
