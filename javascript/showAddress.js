web3.currentProvider.publicConfigStore.on('update', function(result, error) {
  if (!error) {
    document.getElementById('address').innerHTML = result.selectedAddress;
  }
  else {
    console.log('Error when fetching address');
    console.log(error);
  }
});
