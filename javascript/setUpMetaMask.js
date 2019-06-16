if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  ethereum.enable();
}else{
  web3 = new Web3(new Web3.providers.HttpProvider("rinkeby.infura.io/v3/87c66a413df1470abf86a50b4a8bf555"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
