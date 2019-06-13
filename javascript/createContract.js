fetch('./solidity/agreement.txt')
  .then(response => response.text())
  .then(text => console.log(text));

var compiledContract = BrowserSolc.compile(readTextFile('./solidity/agreement.sol');
console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
