function renderBatch(batch) {
  document.getElementById("resultCard").style.display = "block";

  document.getElementById("productName").innerText = batch.product;
  document.getElementById("producer").innerText = batch.producer;
  document.getElementById("quantity").innerText = batch.quantity;
  document.getElementById("score").innerText = batch.score + "%";
  document.getElementById("photo").src = batch.image;

  renderTimeline(batch.timeline);
  renderQRCode(batch.batchId);
}

function renderTimeline(timeline) {
  let html = "";
  timeline.forEach(item => {
    html += `<p>✔ ${item.stage} - ${item.date}</p>`;
  });
  document.getElementById("timeline").innerHTML = html;
}

function renderQRCode(id) {
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: "verify.html?batch=" + id,
    width: 120,
    height: 120
  });
}

function verifyBatch() {
  const id = document.getElementById("batchInput").value;
  const batch = batches[id];

  if (!batch) {
    alert("Invalid Batch");
    return;
  }

  batch.batchId = id;
  renderBatch(batch);
}