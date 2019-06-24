function userAddData(){
	const userFile = document.getElementById("useradd_file");
	console.log(userFile);
	let ipfsAddress;
  node.add({
          path: userFile.files[0].name,
          content: userFile.files[0]
        },
				 { progress: (prog) => console.log(`received: ${prog}`) }
			 )
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
							document.getElementById("useradd_form").appendChild(a);
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
							document.getElementById("spadd_form").appendChild(a);
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
