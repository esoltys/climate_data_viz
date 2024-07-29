// Function to fetch data from the API
async function fetchData(year, month) {
    const response = await fetch(`/api/temperature?year=${year}&month=${month}`);
    return await response.json();
}

// Function to create the chart
function createChart(data) {
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const dataArray = [
        {label: "Min", value: data.min_temperature},
        {label: "Avg", value: data.average_temperature},
        {label: "Max", value: data.max_temperature}
    ];

    x.domain(dataArray.map(d => d.label));
    y.domain([Math.min(0, d3.min(dataArray, d => d.value)), d3.max(dataArray, d => d.value)]);

    svg.selectAll(".bar")
        .data(dataArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value))
        .attr("fill", d => d.value < 0 ? "blue" : "red");

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(`Temperature Data for ${data.year}-${data.month}`);
}

// Main function to fetch data and create the chart
async function main() {
    const data = await fetchData(2023, 7);  // You can change these values or make them dynamic
    createChart(data);
}

// Run the main function when the page loads
window.onload = main;