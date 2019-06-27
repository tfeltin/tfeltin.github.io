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

	$myDataloc.insertBefore(row, $myDataloc.firstChild);
	document.getElementById('empty-row-get').style.display = 'none';
}

function getData(){
  var flag = 0;
  const user_add = document.getElementById("user_getdata").value;
  contract.getUserData.call(user_add, (e,userData) => {
    if (!e){
      while(userData.length > 0){
        const hash = userData.substring(0,46);
        r = r.substring(46);

        contract.checkAccess.call(hash, (er,r) => {
          if (!er){
            if (r == true){
              node.get(hash).then((files) => {
                downloadableFile_usr(files[1].name, hash, files[1].size, files[1].content);
              });
              flag = 1;
            }
          } else {
            console.log(er);
          }
        });
      }
      if (flag == 0){
        document.getElementById("empty-row-get").innerHTML = "You don't have access to data owned by this address"
      }
    } else {
      console.log(e);
    }
  });
}

document.getElementById("getdata_button").addEventListener("click", getData);
