
// const ctx = document.getElementById('barchart').getContext('2d');
// let chartType = 'line'; // Initially set to 'bar'

// // Initial chart data
// const initialData = {
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

// // Create initial chart
// let chart = new Chart(ctx, {
//   type: chartType,
//   data: initialData,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

// // Function to update the chart type or data
// function updateChart() {
//   // Destroy the current chart before creating a new one
//   chart.destroy();
  
//   // Toggle between 'bar' and 'line' chart types
//   chartType = chartType === 'bar' ? 'line' : 'bar';

//   // Update the chart with new type or data
//   chart = new Chart(ctx, {
//     type: chartType,
//     data: initialData, // You can change the data here as well
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }

// // Add an event listener to the button to change the chart on click
// document.getElementById('changeChart').addEventListener('click', updateChart);



// const ctx = document.getElementById('barchart').getContext('2d');

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
// document.getElementById('changeData').addEventListener('click', updateChartData);




const ctx = document.getElementById('barchart').getContext('2d');
let chartType = 'bar'; // Initially set to 'bar'

// Initial chart data
const Crop1datset = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [1900,2000,2100,2200,2300,2400],
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
const Crop2datset = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [1600,1800,1900,2000,2100,2200],
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
const Crop3datset = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [10,20,30,40,50,60,70],
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
const Crop4datset = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [10,20,30,40,50,60,70],
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
const Crop5datset = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
  datasets: [{
    label: 'My First Dataset',
    data: [10,20,30,40,50,60,70],
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
    data: Crop1datset,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  

// Function to update the chart type
function updateChartType() {
  chart.destroy(); // Destroy the old chart
  chartType = chartType === 'bar' ? 'line' : 'bar'; // Toggle between 'bar' and 'line'
    chart = new Chart(ctx, {
    type: chartType,
    data: chart.data, // Keep the same data
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Function to update the chart data


// Function to reset the chart data to the initial state
function Crop1func() {
  chart.data= Crop1datset; // Reset to initial datasets
  chart.update(); // Refresh the chart
}
function Crop2func() {
  chart.data = Crop2datset; // Reset to initial datasets
  chart.update(); // Refresh the chart
}
function Crop3func() {
  chart.data = Crop3datset; // Reset to initial datasets
  chart.update(); // Refresh the chart
}
function Crop4func() {
  chart.data = Crop4datset; // Reset to initial datasets
  chart.update(); // Refresh the chart
}
function Crop5func() {
  chart.data= Crop5datset; // Reset to initial datasets
  chart.update(); // Refresh the chart
}

// Event listeners for all three buttons
document.getElementById('changeChart').addEventListener('click', updateChartType);
document.getElementById('Crop1').addEventListener('click', Crop1func);
document.getElementById('Crop2').addEventListener('click', Crop2func);
document.getElementById('Crop3').addEventListener('click', Crop3func);
document.getElementById('Crop4').addEventListener('click', Crop4func);
document.getElementById('Crop5').addEventListener('click', Crop5func);
