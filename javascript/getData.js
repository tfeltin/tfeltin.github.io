const $getDataloc = document.querySelector('#getDataloc');

function downloadableFile_usr(name, hash, size, data) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  const row = document.createElement('tr')

  const nameCell = document.createElement('td')
  nameCell.innerHTML = name

  const hashCell = document.createElement('td')
  hashCell.innerHTML = hash

  const sizeCell = document.createElement('td')
  sizeCell.innerText = size

  const downloadCell = document.createElement('td')
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', name)
  link.innerHTML = '<img width=20 class="table-action" src="assets/download.svg" alt="Download" />'
  downloadCell.appendChild(link)

  row.appendChild(nameCell)
  row.appendChild(hashCell)
  row.appendChild(sizeCell)
  row.appendChild(downloadCell)

	$getDataloc.insertBefore(row, $getDataloc.firstChild);
	document.getElementById('empty-row-get').style.display = 'none';
}

function getData(){
  var flag = 0;
  const fileID = document.getElementById("user_getdata").value;

  web3.eth.getGasPrice((e, gasPrice) => {
    if (!e){
      gasPrice = gasPrice.c[0];
      contract.getToken.estimateGas(fileID, {from: web3.eth.defaultAccount}, (er, gas) => {
        if(!er){
          var tx = {
            from: web3.eth.defaultAccount,
            gas: gas,
            gasPrice: gasPrice
          };
          contract.getToken.sendTransaction(fileID, tx, (err, result) => {
            if(!err){
              contract.getTokenCall.call(fileID, (call_err, token) => {
                if(!call_err){
                  console.log("Token : ", token);
                }else{
                  console.log(call_err);
                }
              });
            }else{
              console.log(err);
            }
          })
        }else{
          console.log(er);
        }
      });
    }else{
      console.log(e);
    }
  });





}

document.getElementById("getdata_button").addEventListener("click", getData);
