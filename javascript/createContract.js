var source;

fetch('./solidity/agreement.txt')
  .then(response => response.text())
  .then(text => source = text);

BrowserSolc.loadVersion("soljson-v0.4.6+commit.2dabbdf0.js", function(compiler) {
  optimize = 1;
  result = compiler.compile(source, optimize);
  console.log(result);
});
