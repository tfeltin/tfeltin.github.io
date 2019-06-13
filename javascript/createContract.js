var contractText;

fetch('./solidity/agreement.txt')
  .then(response => response.text())
  .then(text => contractText = text);

var compiledContract = BrowserSolc.compile(contractText);
console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
