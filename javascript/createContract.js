fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => var compiledContract = BrowserSolc.compile(text));

console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
