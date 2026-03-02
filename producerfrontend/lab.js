async function addLabEvent(){
  const batchId = document.getElementById('batchId').value;

  const event = {
    role:'lab',
    actor:'LabUser',
    action:'Lab Verification',
    notes:document.getElementById('notes').value,
  };

  await addEventAPI(batchId,event);
  alert('Lab Result Added');
}
