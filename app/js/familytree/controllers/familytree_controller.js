module.exports = function(app) {
  app.controller('FamilyTreeController', ['$scope', 'leafletData', '$http',
    function($scope,leafletData, $http) {

      // var Sigma = require('sigma');
      // var sigma = require('sigma');
      // var Sigma = require('../../plugins/sigma.require');
      // var sigma = require('../../plugins/sigma.require');
      // var sigma = new Sigma();
      require('../../plugins/sigma.parsers.json.js');
      require('../../plugins/sigma.parsers.cypher.js');

      sigma.neo4j.cypher(
        { url: 'http://localhost:7474', user: 'neo4j', password: 'family' },
        'MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 100',
        { container: 'graph-container' } ,
          function(s) {
            console.log('Number of nodes :'+ s.graph.nodes().length);
            console.log('Number of edges :'+ s.graph.edges().length);
            console.log(s);

            var g = new sigma({
              graph: s,
              container: 'graph-container'
});
            }
      );

// var i,
//     s,
//     N = 100,
//     E = 500,
//     g = {
//       nodes: [],
//       edges: []
//     };
// // Generate a random graph:
// for (i = 0; i < N; i++)
//   g.nodes.push({
//     id: 'n' + i,
//     label: 'Node ' + i,
//     x: Math.random(),
//     y: Math.random(),
//     size: Math.random(),
//     color: '#666'
//   });
// for (i = 0; i < E; i++)
//   g.edges.push({
//     id: 'e' + i,
//     source: 'n' + (Math.random() * N | 0),
//     target: 'n' + (Math.random() * N | 0),
//     size: Math.random(),
//     color: '#ccc'
//   });
// // Instantiate sigma:
// s = new sigma({
//   graph: g,
//   container: 'graph-container'
// });

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
