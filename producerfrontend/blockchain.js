async function connectWallet(){
  if(!window.ethereum) return alert('Install MetaMask');
  await window.ethereum.request({method:'eth_requestAccounts'});
  alert('Wallet Connected');
}

function generateHash(data){
  return btoa(JSON.stringify(data)); // placeholder simple hash
}
