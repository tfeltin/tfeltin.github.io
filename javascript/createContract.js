var source;

fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => source = text);

BrowserSolc.loadVersion("soljson-v0.5.10-nightly.2019.6.13+commit.62bd7032.js", function(compiler) {
  source = 'contract x { function g() {} }';
  optimize = 1;
  result = compiler.compile(source, optimize);
  console.log(result);
});
