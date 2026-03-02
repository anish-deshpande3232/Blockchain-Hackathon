function onScanSuccess(decodedText) {

  html5QrcodeScanner.clear();

  console.log("Scanned:", decodedText);

  try {
    const parsedData = JSON.parse(decodedText);

    // Check if batchId exists
    if (!parsedData.batchId) {
      throw new Error("Invalid QR Structure");
    }

    const batchId = parsedData.batchId;

    // Display batchId
    document.getElementById("productName").innerText = batchId;
    document.getElementById("resultCard").style.display = "block";

  } catch (error) {

    // If JSON parsing fails OR batchId missing
    document.getElementById("productName").innerText = "❌ Invalid QR Code";
    document.getElementById("resultCard").style.display = "block";

    console.log("Invalid QR:", error);
  }
}


// Initialize scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader",
  { fps: 10, qrbox: 250 },
  false
);

html5QrcodeScanner.render(onScanSuccess);