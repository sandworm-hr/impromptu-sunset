angular.module('app.directives', [])

.directive('d3', function($timeout){
  return{
    replace: true,
    scope:{
      margin:"=",
      //width:"=",
      height:"=",
      control: "=control"
    },
    link: function(scope, element){
       scope.internalControl = scope.control || {};
       
       var width = element[0].offsetWidth;
       var height = scope.height;
       var margin = scope.margin;
       
    var svg = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("class", "graph")
      .attr("transform", "translate(" + margin.left  + "," + margin.top + ")");    


      scope.internalControl.createGraph = function(data, yLabel) {

        console.log("yLabel isss ",yLabel);
          var x = d3.scale.linear()
            .range([0, width-margin.left - 10]);

          var y = d3.scale.linear()
            .range([height-30, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          var line = d3.svg.line()
            .x(function(d) { return x(d.increment); })
            .y(function(d) { return y(d.point); });


          x.domain(d3.extent(data, function(d) { return d.increment; }));
          y.domain(d3.extent(data, function(d) { return d.point; }));

          $timeout(function() {
              console.log('appending svg');
            
              svg.append("g")
                  .attr("class", "x axis horizontal")
                  .transition()
                    .duration(1500)
                    .attr("transform", "translate(0," + (height-20) + ")")
                    .call(xAxis);

              svg.append("g")
                  .transition()
                    .duration(1500)
                    .attr("class", "y axis vertical")
                    .call(yAxis);

              svg.append("text")
                  .transition()
                    .duration(1500)
                    .attr("class", "y label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -50)
                    .attr("x", -50)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(yLabel);

              svg.append("path")
                .datum(data)
                .attr("class", "line")
                .transition()
                  .duration(1500)
                  // .style("stroke-opacity", 1e-6)
                  .style("stroke-opacity", 1)
                  .attr("d", line);

          }, 1);
      };

      scope.internalControl.removeGraph = function() {

        $timeout(function() {
          console.log('removing graph');

          var graph = d3.select("svg").select(".graph");

          console.log(graph);

          graph.select('g.horizontal')
            .transition()
              .duration(1500)
              .attr("transform", "translate(" + width + "," + height + ")")
              .style("fill-opacity", 1e-6)
              .style("stroke-opacity", 1e-6)
              .remove();
          
          graph.select('g.vertical')
            .transition()
              .duration(1500)
              .attr("transform", "translate(0," + height + ")")
              .style("fill-opacity", 1e-6)
              .style("stroke-opacity", 1e-6)
              .remove();

          graph.select('.label').remove();

          graph.select('path.line')
            .transition()
              .duration(1500)
              .attr("transform", "translate(" + width + ", 0)")
              .style("stroke-opacity", 1e-6)
              .remove();
        }, 1);

      }

      scope.internalControl.loaded();

    }
  };
});