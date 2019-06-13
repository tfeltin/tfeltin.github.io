var source;

fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => source = text);

BrowserSolc.loadVersion("soljson-v0.5.0+commit.1d4f565a.js", function(compiler) {
    optimize = 1;
    result = compiler.compile(source, optimize);
    console.log(result);
});
