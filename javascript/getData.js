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


function waitForToken(txHash,fileID) {
  setTimeout(() => {
    web3.eth.getTransaction(txHash, (e,tx) => {
      if (tx != null) {
        console.log(tx);
        console.log('Transaction ' + txHash + ' has been successfully confirmed');
        contract.getTokenCall.call(fileID, (call_err, token) => {
          if(!call_err){
            console.log("Token : ", token);
            var a = document.createElement('a');
            var linkText = document.createTextNode("TOKEN : " + token);
            a.appendChild(linkText);
            document.getElementById("redeem_form").appendChild(a);
            document.getElementById("redeem_form").reset();
          }else{
            console.log(call_err);
          }
        });
        return;
      }
      return waitForToken(txHash, fileID);
    });
  }, 10 * 1000);
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
          contract.getToken.sendTransaction(fileID, tx, async (err, hash) => {
            if(!err){
              contract.getTokenCall.call(fileID, (call_err, token) => {
                if(!call_err){
                  console.log("Token before: ", token);
                  waitForToken(hash, fileID);
                }else{
                  console.log(call_err);
                }
              });
            }else{
              console.log(err);
            }
          });
        }else{
          console.log(er);
        }
      });
    }else{
      console.log(e);
    }
  });
}


function getData2(token, fileID){
  var fileID = document.getElementById('redeem_fileID');
  var token = document.getElementById('redeem_token');
  console.log(fileID, token)
  web3.eth.getGasPrice((e, gasPrice) => {
    if (!e){
      gasPrice = gasPrice.c[0];
      contract.validateToken.estimateGas(token, fileID, {from: web3.eth.defaultAccount}, (er, gas) => {
        if(!er){
          var tx = {
            from: web3.eth.defaultAccount,
            gas: gas,
            gasPrice: gasPrice
          };
          contract.validateToken.sendTransaction(token, fileID, tx, (err, result) => {
            if(!err){
              contract.validateToken.call(token, fileID, (error, mapAddress) => {
                if(!error){
                  console.log("Map address received : ", mapAddress);
                  node.get(mapAddress).then((mapStr) =>{
                    var map = new Map(JSON.parse(mapStr[1].content.toString()));
                    var ipfsAddress = map.get(fileID);
                    console.log("IPFS address of data : ", ipfsAddress);
                  });
                }else{
                  console.log(error);
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
document.getElementById("redeem_button").addEventListener("click", getData2);
