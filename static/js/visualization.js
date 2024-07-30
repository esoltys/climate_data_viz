// Function to fetch data from the API
async function fetchData(year, month) {
    const response = await fetch(`/api/temperature?year=${year}&month=${month}`);
    return await response.json();
}

// Function to create the chart
function createChart(data) {
    const chart = echarts.init(document.getElementById('chart'));
    const option = {
        title: {
            text: `Temperature Data for ${data.year}-${data.month}`
        },
        tooltip: {},
        xAxis: {
            data: ['Min', 'Avg', 'Max']
        },
        yAxis: {
            name: 'Temperature (°C)'
        },
        series: [{
            name: 'Temperature',
            type: 'bar',
            data: [
                data.min_temperature,
                data.average_temperature,
                data.max_temperature
            ]
        }]
    };
    chart.setOption(option);
}


// Main function to fetch data and create the chart
async function main() {
    const data = await fetchData(2023, 7);  // You can change these values or make them dynamic
    createChart(data);
}

// Run the main function when the page loads
window.onload = main;