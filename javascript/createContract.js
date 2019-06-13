var source;

fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => source = text);

console.log("cc on est là")

BrowserSolc.loadVersion("soljson-v0.5.0+commit.1d4f565a.js", function(err, compiler) {
    optimize = 1;
    result = compiler.compile(source, optimize);
    console.log(result);
});
