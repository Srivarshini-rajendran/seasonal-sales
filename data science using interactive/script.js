let chart; // Global variable to store the chart

document.getElementById("salesForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const winter = Number(document.getElementById("winter").value);
  const spring = Number(document.getElementById("spring").value);
  const summer = Number(document.getElementById("summer").value);
  const autumn = Number(document.getElementById("autumn").value);

  const seasons = ["Winter", "Spring", "Summer", "Autumn"];
  const sales = [winter, spring, summer, autumn];

  // Calculate stats
  const maxSale = Math.max(...sales);
  const minSale = Math.min(...sales);
  const totalSale = sales.reduce((a, b) => a + b, 0);

  document.getElementById("maxSeason").innerText =
    seasons[sales.indexOf(maxSale)] + " (" + maxSale + "L)";
  document.getElementById("minSeason").innerText =
    seasons[sales.indexOf(minSale)] + " (" + minSale + "L)";
  document.getElementById("totalSales").innerText = totalSale + "L";

  // Draw or update chart
  const ctx = document.getElementById("salesChart").getContext("2d");

  if (chart) {
    chart.destroy(); // remove previous chart before re-drawing
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: seasons,
      datasets: [
        {
          label: "Sales (in ₹ Lakhs)",
          data: sales,
          backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#f87171"],
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
        title: { display: true, text: "Seasonal Sales Distribution" },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
});
