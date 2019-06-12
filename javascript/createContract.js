var compiledContract = browserSolc.compile(fs.readFileSync('./solidity/agreement.sol').toString());
console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
