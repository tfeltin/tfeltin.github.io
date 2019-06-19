function getMyData(){
	web3.eth.getGasPrice((e, gasPrice) => {
		if (!e){
			gasPrice = gasPrice.c[0];
			contract.userAddData.estimateGas({from: web3.eth.defaultAccount}, (err, gas) => {
				if (!err){
					const tx = {
						from: web3.eth.defaultAccount,
						gas: gas,
						gasPrice: gasPrice
					};
					contract.getMyData.sendTransaction(tx, (err, result) => {
						if (!err){
							console.log(result);
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

document.getElementById("getMyData").addEventListener("click", getMyData);
