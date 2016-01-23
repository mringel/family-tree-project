module.exports = function(app) {
  app.controller('FamilyTreeController', ['$scope', 'leafletData', '$http',
    function($scope,leafletData, $http) {

      require('../../plugins/sigma.parsers.json.js');
      require('../../plugins/sigma.parsers.cypher.js');
      require('../../plugins/sigma.plugins.design.js');

      var settings = {

      };

      var s = new sigma({
        container: 'graph-container',
        settings: settings
      });

      sigma.neo4j.cypher(
        { url: 'http://localhost:7474', user: 'neo4j', password: 'family' },
        'MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 100',
        s,
          function(s) {
            console.log('Number of nodes :'+ s.graph.nodes().length);
            console.log(s.graph.nodes());
            console.log('Number of edges :'+ s.graph.edges().length);
            console.log(s.graph.edges());
            // sigma.plugins.killDesign(s);
            var design = sigma.plugins.design(s);
            console.log(design);
            design.setStyles({
              nodes: {
                label: {
                  by: 'neo4j_labels',
                  format: function(value) { return 'Name: ' + value; }
                }
              }
            });

            // var newNodes = s.graph.nodes();
            // var newEdges = s.graph.edges();

            design.apply();
            s.refresh();
            // s.kill();

            // console.log(s);
            //
            // var myGraph = new sigma.classes.graph();
            //
            // myGraph.read({
            //   nodes: newNodes,
            //   edges: newEdges
            // });
            // console.log('myGraph is: ');
            // console.log(myGraph);
            //
            // console.log('instantiating new sigma');
            // s = new sigma({
            //   graph: myGraph,
            //   container: 'graph-container'
            // });
            // console.log(s);
            // console.log(s.graph.nodes());

          }
      );





      // // Let's first initialize sigma:
      //     var s = new sigma('graph-container');
      //
      //     // Then, let's add some data to display:
      //     s.graph.addNode({
      //       // Main attributes:
      //       id: 'n0',
      //       label: 'Hello',
      //       // Display attributes:
      //       x: 0.5,
      //       y: 0.5,
      //       size: 1,
      //       color: '#f00'
      //     }).addNode({
      //       // Main attributes:
      //       id: 'n1',
      //       label: 'World !',
      //       // Display attributes:
      //       x: 1,
      //       y: 1,
      //       size: 1,
      //       color: '#00f'
      //     }).addEdge({
      //       id: 'e0',
      //       // Reference extremities:
      //       source: 'n0',
      //       target: 'n1'
      //     });
      //
      //     // Finally, let's ask our sigma instance to refresh:
      //     s.refresh();


      angular.extend($scope, {

        defaults: {
          scrollWheelZoom: true,
          doubleClickZoom: false,
          tap: false,
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          maxZoom: 14
        }
      });

    }]);
};
