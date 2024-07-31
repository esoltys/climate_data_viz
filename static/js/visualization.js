// Function to fetch data from the API
async function fetchData(year, month) {
    const response = await fetch(`/api/temperature?year=${year}&month=${month}`);
    return await response.json();
}

function createChart(data) {
    const chart = echarts.init(document.getElementById('chart'));
    const option = {
        title: {
            text: `Temperature Data for ${data.year}-${data.month}`,
            top: 0,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                let result = `${params[0].name}<br/>`;
                params.forEach(param => {
                    let value = param.value;
                    if (typeof value === 'number') {
                        value = value.toFixed(2);
                    }
                    result += `${param.marker} ${param.seriesName}: ${value}°C<br/>`;
                });
                return result;
            }
        },
        legend: {
            top: '30px',
            left: 'center'
        },
        grid: {
            left: '10%',  // Increased left margin
            right: '4%',
            bottom: '10%',
            top: '100px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Temperature']
        },
        yAxis: {
            type: 'value',
            name: 'Temperature (°C)',  // Changed to use degree symbol
            nameLocation: 'middle',
            nameGap: 50,  // Increased gap for y-axis name
            nameRotate: 90  // Rotate the label for better fit
        },
        series: [
            {
                name: 'Min',
                type: 'bar',
                stack: 'Temperature',
                data: [data.min_temperature]
            },
            {
                name: '25th Percentile',
                type: 'bar',
                stack: 'Temperature',
                data: [data['25th_percentile'] - data.min_temperature]
            },
            {
                name: 'Median',
                type: 'bar',
                stack: 'Temperature',
                data: [data.median_temperature - data['25th_percentile']]
            },
            {
                name: '75th Percentile',
                type: 'bar',
                stack: 'Temperature',
                data: [data['75th_percentile'] - data.median_temperature]
            },
            {
                name: 'Max',
                type: 'bar',
                stack: 'Temperature',
                data: [data.max_temperature - data['75th_percentile']]
            },
            {
                name: 'Average',
                type: 'scatter',
                data: [data.average_temperature]
            }
        ]
    };
    
    chart.setOption(option);

    // Add text information
    document.getElementById('additional-info').innerHTML = `
        <p><strong>Additional Information:</strong></p>
        <p>Standard Deviation: ${data.std_deviation.toFixed(2)} °C</p>
        <p>Data Points: ${data.data_points.toLocaleString()}</p>
        <p>Latitude Range: ${data.latitude_range[0]} to ${data.latitude_range[1]}</p>
        <p>Longitude Range: ${data.longitude_range[0]} to ${data.longitude_range[1]}</p>
    `;
}



// Main function to fetch data and create the chart
async function main() {
    const data = await fetchData(2023, 7);  // You can change these values or make them dynamic
    createChart(data);
}

// Run the main function when the page loads
window.onload = main;