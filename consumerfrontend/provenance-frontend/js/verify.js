// 🔐 Protect page
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Initialize scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader",
  { fps: 10, qrbox: 250 },
  false
);

html5QrcodeScanner.render(onScanSuccess);


// 🎯 SIMPLE WORKING VERSION
function onScanSuccess(decodedText) {

  html5QrcodeScanner.clear();

  const card = document.getElementById("resultCard");
  const validContent = document.getElementById("validContent");
  const invalidContent = document.getElementById("invalidContent");
  const restartBtn = document.getElementById("restartBtn");

  try {
    const parsedData = JSON.parse(decodedText);

    if (!parsedData.batchId) {
      throw new Error("Invalid QR");
    }

    // VALID QR
    document.getElementById("productName").innerText = parsedData.batchId;

    validContent.style.display = "block";
    invalidContent.style.display = "none";

  } catch (error) {

    // INVALID QR
    validContent.style.display = "none";
    invalidContent.style.display = "block";
  }

  card.style.display = "block";
  restartBtn.style.display = "block";
}


// 🔄 Restart
document.getElementById("restartBtn").addEventListener("click", function () {

  document.getElementById("resultCard").style.display = "none";
  document.getElementById("validContent").style.display = "none";
  document.getElementById("invalidContent").style.display = "none";
  this.style.display = "none";

  html5QrcodeScanner.render(onScanSuccess);
});