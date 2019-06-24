const abi = [
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
		"constant": true,
		"inputs": [
			{
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "checkAccess",
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
	}
]

const cont = window.web3.eth.contract(abi);
const contract = cont.at("0x7c9d70f0ae85a035308405fcb33e000a9284d072");
const node = new window.Ipfs();
node.once('start', () => {
	node.id().then((id) => {document.getElementById('nodeId').innerHTML = id.id;});
};

function downloadableFile (name, hash, size, data) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  const row = document.createElement('tr')

  const nameCell = document.createElement('td')
  nameCell.innerHTML = name

  const hashCell = document.createElement('td')
  hashCell.innerHTML = hash

  const sizeCell = document.createElement('td')
  sizeCell.innerText = size

  const downloadCell = document.createElement('td')
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', name)
  link.innerHTML = '<img width=20 class="table-action" src="assets/download.svg" alt="Download" />'
  downloadCell.appendChild(link)

  row.appendChild(nameCell)
  row.appendChild(hashCell)
  row.appendChild(sizeCell)
  row.appendChild(downloadCell)

	document.getElementById("myDataloc").insertRow(row);
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
        while(r.length > 0){
          var hash = r.substring(0,46);
          r = r.substring(46);

					node.get(hash).then((files) => downloadableFile(files[0].name, hash, files[0].size, files[0].content));

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
