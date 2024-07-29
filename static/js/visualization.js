// Function to fetch data from the API
async function fetchData(year, month) {
    const response = await fetch(`/api/temperature?year=${year}&month=${month}`);
    return await response.json();
}

// Function to create the chart
function createChart(data) {
    const margin = {top: 40, right: 20, bottom: 50, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear any existing SVG
    d3.select("#chart").select("svg").remove();

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
    
    // Set y domain to include 0 and add some padding
    const yMin = Math.min(0, d3.min(dataArray, d => d.value));
    const yMax = d3.max(dataArray, d => d.value);
    const yPadding = (yMax - yMin) * 0.1;
    y.domain([yMin - yPadding, yMax + yPadding]);

    svg.selectAll(".bar")
        .data(dataArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("width", x.bandwidth())
        .attr("y", d => y(Math.max(0, d.value)))
        .attr("height", d => Math.abs(y(d.value) - y(0)))
        .attr("fill", d => d.value < 0 ? "blue" : "red");

    // Add value labels on top of each bar
    svg.selectAll(".label")
        .data(dataArray)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.label) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) + (d.value >= 0 ? -5 : 15))
        .attr("text-anchor", "middle")
        .text(d => d.value.toFixed(2));

    svg.append("g")
        .attr("transform", `translate(0,${y(0)})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Temperature (°C)");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(`Temperature Data for ${data.year}-${data.month}`);

    // Add a zero line
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", width)
        .attr("y2", y(0))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4");
}

// Main function to fetch data and create the chart
async function main() {
    const data = await fetchData(2023, 7);  // You can change these values or make them dynamic
    createChart(data);
}

// Run the main function when the page loads
window.onload = main;