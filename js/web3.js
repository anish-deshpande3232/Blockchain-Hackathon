let provider;
let signer;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  const address = await signer.getAddress();
  console.log("Connected:", address);

  // 👇 update UI
  document.getElementById("walletAddress").innerText =
    "Connected: " + address.slice(0, 6) + "...";
}