const BASE_URL = 'http://172.16.44.115:4000';

async function createBatchAPI(payload){
  return fetch(`${BASE_URL}/api/batch`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  }).then(res=>res.json());
}

async function addEventAPI(batchId,event){
  return fetch(`${BASE_URL}/api/batch/${batchId}/event`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(event)
  }).then(res=>res.json());
}
