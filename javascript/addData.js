function userAddData(){
	var userFile = document.getElementById("useradd_file");
	var ipfsAddress;
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
					contract.userAddData.sendTransaction(ipfsAddress, tx, (err, result) => {
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
  node.add({
          path: spFile.files[0].name,
          content: spFile.files[0]
        }, { wrapWithDirectory: true, progress: (prog) => console.log(`received: ${prog}`) })
    .then((response) => {
      ipfsAddress = response[1].hash;
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
					contract.spAddData.sendTransaction(ipfsAddress, userAddress, tx, (err, result) => {
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
