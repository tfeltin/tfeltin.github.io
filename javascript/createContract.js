BrowserSolc.getVersions(function(soljsonSources, soljsonReleases) {
  console.log(soljsonSources);
  console.log(soljsonReleases);
});

var compiledContract = BrowserSolc.compile(fs.readFileSync('./javascript/agreement.sol').toString());
console.log(compiledContract);
var abi = compiledContract.contracts[':Agreement'].interface;
var bytecode = compiledContract.contracts[':Agreement'].bytecode;
console.log(abi);
console.log(bytecode);
