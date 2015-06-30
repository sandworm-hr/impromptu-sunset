angular.module('app.directives', [])
// d3 directive to use it in profile and results page.
.directive('d3', function($timeout){
  return{
    replace: true,
    // directive has its own scope, and we pass in parameters from the container's controller scope
    scope:{
      margin:"=",
      //width:"=",
      height:"=",
      control: "=control"
    },
    link: function(scope, element){
       // control is an object that enables the controller to access methods in the directive.
       scope.internalControl = scope.control || {};
      
        // initialize the width height and margins of the chart
       var width = element[0].offsetWidth;
       var height = scope.height;
       var margin = scope.margin;
       
       // length of transitions in milliseconds
       var duration = 1000;
       
       // create the svg for the chart
    var svg = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("class", "graph")
      .attr("transform", "translate(" + margin.left  + "," + margin.top + ")");    


      scope.internalControl.createGraph = function(data, yLabel) {

          // x goes all the way but subtracting the margin and a constant offset for more space.
          var x = d3.scale.linear()
            .range([0, width-margin.left - 10]);
          // y goes all the way, subtracting constant offset for space
          var y = d3.scale.linear()
            .range([height-40, 0]);
          // create xAxis
          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
          // create yAxis
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
          // create the line that we'll use to join our data points
          var line = d3.svg.line()
            .x(function(d) { return x(d.increment); })
            .y(function(d) { return y(d.point); });

          // setting x and y domains
          x.domain(d3.extent(data, function(d) { return d.increment; }));
          y.domain(d3.extent(data, function(d) { return d.point; }));

          $timeout(function() {
              // appending the xAxis to the svg
              svg.append("g")
                  .attr("class", "x axis horizontal")
                  .attr("transform", "translate(" + -width + "," + (height-30) + ")")
                  .call(xAxis);
              svg.select(".horizontal")
                  .transition()
                    .duration(duration)
                    .attr("transform", "translate(0," + (height-30) + ")")
              // appending the yAxis to the svg
              svg.append("g")
                  .attr("class", "y axis vertical")
                  .attr("transform", "translate(" + -width + ", 0)")
                  .call(yAxis);
              svg.select(".vertical")
                  .transition()
                    .duration(duration)
                    .attr("transform", "translate(0, 0)");
              // appending the yLabel to the svg
              svg.append("text")
                  .attr("class", "y label")
                  .transition()
                    .duration(duration)
                    .attr("transform", "rotate(-90)")
                    .attr("y", - margin.left)
                    .attr("x", -50)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(yLabel);
              // appending the path to the svg
              svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line)
                .attr("transform", "translate(" + -width + ", 0)")
                .style("stroke-opacity", 1e-6);
              svg.select(".line")
                .transition()
                  .duration(duration)
                  .attr("transform", "translate(0, 0)")
                  .style("stroke-opacity", 1);
          }, 1);
      };

      scope.internalControl.removeGraph = function() {
        // removing the chart (animated)
        $timeout(function() {
          // select the graph
          var graph = d3.select("svg").select(".graph");

          // animate removal of xAxis
          graph.select('g.horizontal')
            .transition()
              .duration(duration)
              .attr("transform", "translate(" + (width + 30) + "," + height + ")")
              // .style("fill-opacity", 1e-6)
              // .style("stroke-opacity", 1e-6)
              .remove();
          
          // animate removal of yAxis
          graph.select('g.vertical')
            .transition()
              .duration(duration)
              .attr("transform", "translate(" + (width + 30) + ", 0)")
              // .style("fill-opacity", 1e-6)
              // .style("stroke-opacity", 1e-6)
              .remove();

          // remove yaxis label
          graph.select('.label').remove();

          // animate removal of the line/path
          graph.select('path.line')
            .transition()
              .duration(duration)
              .attr("transform", "translate(" + (width + 30) + ", 0)")
              // .style("stroke-opacity", 1e-6)
              .remove();
        }, 1);

      };

      // this tells the controller that the directive finished loading, and thus
      // you can start calling these methods from the controller.
      scope.internalControl.loaded();

    }
  };
});