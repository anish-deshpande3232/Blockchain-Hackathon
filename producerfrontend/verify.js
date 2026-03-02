async function verifyBatch(){
  const batchId = document.getElementById('batchId').value;
  const res = await fetch(`http://172.16.44.115:4000/api/verify/${batchId}`);
  const data = await res.json();
  document.getElementById('result').innerText = JSON.stringify(data,null,2);
}
