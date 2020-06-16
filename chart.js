// // var width = document.getElementById("chartArea").clientWidth;
// // //this allows us to collect the width of the div where the SVG will go.
// // var height = width / 3.236;
// // //I like to use the golden rectangle ratio if they work for my charts.

// // var svg = d3.select("#chartArea").append("svg");
// // //We add our svg to the div area

// // //We will build a basic function to handle window resizing.
// // function resize() {
// //   width = document.getElementById("chartArea").clientWidth;
// //   height = width / 3.236;
// //   d3.select("#chartArea svg").attr("width", width).attr("height", height);
// // }

// // window.onresize = resize;
// // //Call our resize function if the window size is changed.

// var mainButton = d3.select("#mainButton");
// mainButton.on("click", function () {
//   console.log("Click, click");
// });

// var margin = { top: 10, right: 30, bottom: 30, left: 40 },
//   width = 460 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3
//   .select("#my_dataviz")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // get the data
// d3.csv(
//   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv",
//   function (data) {
//     // X axis: scale and draw:
//     var x = d3
//       .scaleLinear()
//       .domain([0, 1000]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
//       .range([0, width]);
//     svg
//       .append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//     // set the parameters for the histogram
//     var histogram = d3
//       .histogram()
//       .value(function (d) {
//         return d.price;
//       }) // I need to give the vector of value
//       .domain(x.domain()) // then the domain of the graphic
//       .thresholds(x.ticks(70)); // then the numbers of bins

//     // And apply this function to data to get the bins
//     var bins = histogram(data);

//     // Y axis: scale and draw:
//     var y = d3.scaleLinear().range([height, 0]);
//     y.domain([
//       0,
//       d3.max(bins, function (d) {
//         return d.length;
//       }),
//     ]); // d3.hist has to be called before the Y axis obviously
//     svg.append("g").call(d3.axisLeft(y));

//     // append the bar rectangles to the svg element
//     svg
//       .selectAll("rect")
//       .data(bins)
//       .enter()
//       .append("rect")
//       .attr("x", 1)
//       .attr("transform", function (d) {
//         return "translate(" + x(d.x0) + "," + y(d.length) + ")";
//       })
//       .attr("width", function (d) {
//         return x(d.x1) - x(d.x0) - 1;
//       })
//       .attr("height", function (d) {
//         return height - y(d.length);
//       })
//       .style("fill", "#69b3a2");
//   }
// );