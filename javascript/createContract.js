var compiledContract = BrowserSolc.compile(fs.readFileSync('./solidity/agreement.sol', 'utf-8').toString());
console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
