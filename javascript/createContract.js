var source;

fetch('./solidity/agreement.sol')
  .then(response => response.text())
  .then(text => source = text);

console.log("cc on est là")

BrowserSolc.loadVersion("soljson-v0.5.9+commit.e560f70d.js", function(compiler) {
  optimize = 1;
  result = compiler.compile(source, optimize);
  console.log(result);
});
