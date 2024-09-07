// const ctx = document.getElementById('barchart').getContext('2d');

// // Define the labels for the x-axis
// const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'];


// console.log("1",Chart)
// // Create the chart
// const barchart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'My First Dataset',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//                 'rgba(255, 205, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(201, 203, 207, 0.2)'
//             ],
//             borderColor: [
//                 'rgb(255, 99, 132)',
//                 'rgb(255, 159, 64)',
//                 'rgb(255, 205, 86)',
//                 'rgb(75, 192, 192)',
//                 'rgb(54, 162, 235)',
//                 'rgb(153, 102, 255)',
//                 'rgb(201, 203, 207)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });



const ctx = document.getElementById('barchart').getContext('2d');
let chartType = 'line'; // Initially set to 'bar'

// Initial chart data
const initialData = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

// Create initial chart
let chart = new Chart(ctx, {
  type: chartType,
  data: initialData,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Function to update the chart type or data
function updateChart() {
  // Destroy the current chart before creating a new one
  chart.destroy();
  
  // Toggle between 'bar' and 'line' chart types
  chartType = chartType === 'bar' ? 'line' : 'bar';

  // Update the chart with new type or data
  chart = new Chart(ctx, {
    type: chartType,
    data: initialData, // You can change the data here as well
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Add an event listener to the button to change the chart on click
document.getElementById('changeChart').addEventListener('click', updateChart);



// const ctx = document.getElementById('barchart').getContext('2d');

// // Define initial chart data
// const chartData = {
//   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)',
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)'
//     ],
//     borderWidth: 1
//   }]
// };

// // Create the initial chart
// let chart = new Chart(ctx, {
//   type: 'line',
//   data: chartData,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

// // Define new datasets
// const newDataSets = [
//   {
//     label: 'Updated Dataset 1',
//     data: [75, 65, 85, 90, 60, 50, 45],
//     backgroundColor: [
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)', 
//       'rgba(201, 203, 207, 0.2)',
//       'rgba(255, 99, 132, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)',
//       'rgb(255, 99, 132)'
//     ],
//     borderWidth: 1
//   }
// ];

// // Function to update chart data
// function updateChartData() {
//   chart.data.datasets = newDataSets; // Set new datasets
//   chart.update(); // Refresh the chart
// }

// // Add event listener to button to change chart data on click
// document.getElementById('changeChart').addEventListener('click', updateChartData);
