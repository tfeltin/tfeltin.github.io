function getMyData(){
  contract.getMyData.call((e,r) => {
    if (!e){
      console.log(e);
    } else {
      document.getElementById("myDataloc").appendChild(a);
    }
  })
}
