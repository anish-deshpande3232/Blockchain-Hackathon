function renderAdminStats(stats) {
  new Chart(document.getElementById("myChart"), {
    type: 'bar',
    data: {
      labels: stats.labels,
      datasets: [{
        label: 'Batches',
        data: stats.values
      }]
    }
  });
}