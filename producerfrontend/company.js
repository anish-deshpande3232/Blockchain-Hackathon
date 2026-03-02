async function addCompanyEvent(){
  const batchId = document.getElementById('batchId').value;

  const event = {
    role:'company',
    actor:'CompanyUser',
    action:document.getElementById('action').value,
    notes:'',
  };

  const res = await addEventAPI(batchId,event);
  alert('Event Added');
}
