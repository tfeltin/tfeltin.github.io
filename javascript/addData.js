function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function userAddData(){
	var userFile = document.getElementById("useradd_file");
	var ipfsAddress;
	var fileID;
	var newMapAddress;
  node.add({
          path: userFile.files[0].name,
          content: userFile.files[0]
        },
				 { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
			 )
    .then((response) => {
      ipfsAddress = response[1].hash;
    }).catch((err) => {
      console.error(err)
    });
  var mapAddress = contract.mapAddress.call();
	node.cat(mapAddress).then((mapStr) => {
		var map = new Map(JSON.parse(mapStr));

		const encoder = new TextEncoder();
		const data = encoder.encode(ipfsAddress);
		window.crypto.subtle.digest("SHA-256", data).then((fid) => fileID = buf2hex(fid));
		map.set(fileID, ipfsAddress);
		var newMapStr = JSON.stringify([...map]);
	});
	node.add({
					path: "mapAddress.json",
					content: newMapStr
				},
				 { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
			 )
	.then((response) => {
		newMapAddress = response[1].hash;
	}).catch((err) => {
		console.error(err)
	});

	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.userAddData.estimateGas(ipfsAddress, {from: web3.eth.defaultAccount}, (er, gas) => {
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
}


function spAddData(){
	var userAddress = document.getElementById("user_eth_address").value;
	var spFile = document.getElementById("spadd_file");
	var ipfsAddress;
	var fileID;
	var newMapAddress;
	node.add({
					path: spFile.files[0].name,
					content: spFile.files[0]
				}, { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) })
		.then((response) => {
			ipfsAddress = response[1].hash;
		}).catch((err) => {
			console.error(err)
		});
	var mapAddress = contract.mapAddress.call();
	node.cat(mapAddress).then((mapStr) => {
		var map = new Map(JSON.parse(mapStr));

		const encoder = new TextEncoder();
		const data = encoder.encode(ipfsAddress);
		window.crypto.subtle.digest("SHA-256", data).then((fid) => fileID = buf2hex(fid));
		map.set(fileID, ipfsAddress);
		var newMapStr = JSON.stringify([...map]);
	});
	node.add({
					path: "mapAddress.json",
					content: newMapStr
				},
				 { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) }
			 )
	.then((response) => {
		newMapAddress = response[1].hash;
	}).catch((err) => {
		console.error(err)
	});

	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.spAddData.estimateGas(ipfsAddress, userAddress, {from: web3.eth.defaultAccount}, (er, gas) => {
				if (!er){
					const tx = {
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
}


document.getElementById("useraddbutton").addEventListener("click", userAddData);
document.getElementById("spadduserdatabutton").addEventListener("click", spAddData);
