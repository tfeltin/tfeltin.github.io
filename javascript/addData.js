// Internal function to convert array to hex string
function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// USER ADDS FILE TO SYSTEM
function userAddData(){
	var userFile = document.getElementById("useradd_file");

  // 1 - add file to IPFS
  node.add({
          path: userFile.files[0].name,
          content: userFile.files[0]
        },
				 { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
			 )
    .then((ipfsAddress) => {
      console.log(ipfsAddress);

      // 2 - get address of mapping from contract
      contract.mapAddress.call((e,mapAddress) => {
        if(!e){
          console.log(mapAddress);

          // 3 - get mapping from IPFS and update it
        	node.get(mapAddress).then((mapStr) => {
        		var map = new Map(JSON.parse(mapStr[1].content.toString()));
        		const encoder = new TextEncoder();
        		const data = encoder.encode(ipfsAddress);
        		window.crypto.subtle.digest("SHA-256", data).then((fid) => {
              var fileID = buf2hex(fid);
              map.set(fileID, ipfsAddress);
              var newMapFile = new File([JSON.stringify([...map])], "mapAddress.json")
              node.add({
            					path: newMapFile.name,
            					content: newMapFile
            				},
                  { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
                )
            	.then((response) => {
            		var newMapAddress = response[1].hash;
                console.log(newMapAddress);

                // 4 - record the file in the smart contract
              	web3.eth.getGasPrice((e, gasPrice) => {
              		if (!e){
              			gasPrice = gasPrice.c[0];
              			contract.userAddData.estimateGas(ipfsAddress, newMapAddress, {from: web3.eth.defaultAccount}, (er, gas) => {
              				if (!er){
              					var tx = {
              						from: web3.eth.defaultAccount,
              						gas: gas,
              						gasPrice: gasPrice
              					};
              					contract.userAddData.sendTransaction(ipfsAddress, newMapAddress, tx, (err, result) => {
              						if (!err){
              							var a = document.createElement('a');
              							var linkText = document.createTextNode("Successfully added file.");
              							a.appendChild(linkText);
              							a.style.color = 'green';
              							document.getElementById("useradd_form").appendChild(a);
              							document.getElementById("useradd_form").reset();
              						} else {
              							console.log("Error in transaction");
              							console.log(err);
              						}
              					});
              				} else {
              					console.log("Error while estimating gas");
              					console.log(er);
              				}
              			});
              		} else {
              			console.log("Error while estimating gas price");
              			console.log(e);
              		}
              	});

            	}).catch((err) => {
            		console.error(err)
            	});
            });

        	});

        }else{
          console.log(e);
        }
      });

    }).catch((err) => {
      console.error(err)
    });
}


// SERVICE PROVVIDER ADDS USER OWNED FILE IN SYSTEM
function spAddData(){
	var userAddress = document.getElementById("user_eth_address").value;
	var spFile = document.getElementById("spadd_file");

  // 1 - add file to IPFS
  node.add({
          path: spFile.files[0].name,
          content: spFile.files[0]
        },
				 { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
			 )
    .then((ipfsAddress) => {
      console.log(ipfsAddress);

      // 2 - get address of mapping from contract
      contract.mapAddress.call((e,mapAddress) => {
        if(!e){
          console.log(mapAddress);

          // 3 - get mapping from IPFS and update it
        	node.get(mapAddress).then((mapStr) => {
        		var map = new Map(JSON.parse(mapStr[1].content.toString()));
        		const encoder = new TextEncoder();
        		const data = encoder.encode(ipfsAddress);
        		window.crypto.subtle.digest("SHA-256", data).then((fid) => {
              var fileID = buf2hex(fid);
              map.set(fileID, ipfsAddress);
              var newMapFile = new File([JSON.stringify([...map])], "mapAddress.json")
              node.add({
            					path: newMapFile.name,
            					content: newMapFile
            				},
                  { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
                )
            	.then((response) => {
            		var newMapAddress = response[1].hash;
                console.log(newMapAddress);

                // 4 - record the file in the smart contract
              	web3.eth.getGasPrice((e, gasPrice) => {
              		if (!e){
              			gasPrice = gasPrice.c[0];
              			contract.spAddData.estimateGas(ipfsAddress, userAddress, newMapAddress, {from: web3.eth.defaultAccount}, (er, gas) => {
              				if (!er){
              					var tx = {
              						from: web3.eth.defaultAccount,
              						gas: gas,
              						gasPrice: gasPrice
              					};
              					contract.spAddData.sendTransaction(ipfsAddress, userAddress, newMapAddress, tx, (err, result) => {
              						if (!err){
              							var a = document.createElement('a');
              							var linkText = document.createTextNode("Successfully added file.");
              							a.appendChild(linkText);
              							a.style.color = 'green';
              							document.getElementById("spadd_form").appendChild(a);
              							document.getElementById("spadd_form").reset();
              						} else {
              							console.log("Error in transaction");
              							console.log(err);
              						}
              					});
              				} else {
              					console.log("Error while estimating gas");
              					console.log(er);
              				}
              			});
              		} else {
              			console.log("Error while estimating gas price");
              			console.log(e);
              		}
              	});

            	}).catch((err) => {
            		console.error(err)
            	});
            });

        	});

        }else{
          console.log(e);
        }
      });

    }).catch((err) => {
      console.error(err)
    });
}

document.getElementById("useraddbutton").addEventListener("click", userAddData);
document.getElementById("spadduserdatabutton").addEventListener("click", spAddData);
