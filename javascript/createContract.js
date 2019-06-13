var source;

fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => source = text);

BrowserSolc.loadVersion("soljson-v0.4.5+commit.b318366e.js", function(compiler) {
    optimize = 1;
    result = compiler.compile(source, optimize);
    console.log(result);
});
