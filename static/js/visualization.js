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
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                if (params.seriesName === 'boxplot') {
                    return `Temperature Distribution<br/>
                            Max: ${data.max_temperature.toFixed(2)}°C<br/>
                            75th Percentile: ${data['75th_percentile'].toFixed(2)}°C<br/>
                            Median: ${data.median_temperature.toFixed(2)}°C<br/>
                            25th Percentile: ${data['25th_percentile'].toFixed(2)}°C<br/>
                            Min: ${data.min_temperature.toFixed(2)}°C`;
                } else if (params.seriesName === 'average') {
                    return `Average: ${data.average_temperature.toFixed(2)}°C`;
                }
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: ['Temperature Distribution'],
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'Temperature (°C)',
            splitArea: {
                show: true
            }
        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: [
                    [
                        data.min_temperature,
                        data['25th_percentile'],
                        data.median_temperature,
                        data['75th_percentile'],
                        data.max_temperature
                    ]
                ],
                itemStyle: {
                    borderColor: '#1f77b4'
                }
            },
            {
                name: 'average',
                type: 'scatter',
                data: [
                    [0, data.average_temperature]
                ],
                symbol: 'diamond',
                symbolSize: 10,
                itemStyle: {
                    color: '#ff7f0e'
                }
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