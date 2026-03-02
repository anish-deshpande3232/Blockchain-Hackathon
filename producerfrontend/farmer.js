async function createBatch(){
  const batchId = 'BATCH-' + Date.now();

  const payload = {
    batchId,
    industryType:'agriculture',
    producerName:'Farmer',
    origin:document.getElementById('origin').value,
    productName:document.getElementById('productName').value,
    quantity:Number(document.getElementById('quantity').value),
    unit:'kg',
    events:[]
  };

  const res = await createBatchAPI(payload);
  document.getElementById('result').innerText = JSON.stringify(res,null,2);
}
