// set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 30, left: 40 },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .insert("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv",
  function (data) {
    // X axis: scale and draw:
    var x = d3
      .scaleLinear()
      .domain([0, 1000]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3
      .histogram()
      .value(function (d) {
        return d.price;
      }) // I need to give the vector of value
      .domain(x.domain()) // then the domain of the graphic
      .thresholds(x.ticks(70));
    // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(bins, function (d) {
        return d.length;
      }),
    ]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", "#69b3a2");
  }
);

function colorize() {
  function randomColorGenerator() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  random_color = randomColorGenerator();
  return random_color;
}
function update(color) {
  var svg = d3.select("#my_dataviz");
  svg.selectAll("rect").style("fill", () => {
    return color;
  });
  d3.select(".blue-button").style("background", () => {
    return color;
  });
}

d3.select(".blue-button").on("click", function () {
  console.log("click");
  let newCol = colorize();
  console.log(newCol);
  update(newCol);
});

let isNight = false;

function switchModes() {
  isNight = !isNight;

  d3.select(".navbar").attr("class", () => {
    if (isNight) {
      return "navbar navbar-expand-lg bg-light navbar-light";
    } else {
      return "navbar navbar-expand-lg bg-dark navbar-dark";
    }
  });

  d3.select(".d-flex")
    .style("background", () => {
      if (!isNight) {
        return "white";
      } else {
        return "#343a49 ";
      }
    })
    .style("color", () => {
      if (!isNight) {
        return "#343a40";
      } else {
        return " white";
      }
    });
  var svg = d3.select("#my_dataviz");
  svg.selectAll(".domain").style("stroke", () => {
    if (!isNight) {
      return "#343a40";
    } else {
      return " white";
    }
  });
  var svg2 = d3.select("#my_dataviz");
  var domains = svg2.selectAll(".tick");
  domains.selectAll("text").style("fill", () => {
    if (!isNight) {
      return "#343a40";
    } else {
      return " white";
    }
  });
  domains.selectAll("line").style("stroke", () => {
    if (!isNight) {
      return "#343a40";
    } else {
      return " white";
    }
  });
}

d3.select(".custom-control-input").on("click", () => {
  console.log(isNight);
  switchModes();
});
