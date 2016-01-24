module.exports = function(app) {
  app.controller('FamilyTreeController',
    ['$scope', 'leafletData', '$http',
    function($scope,leafletData, $http) {

      // var dagre = require('dagre');
      // console.log(typeof dagre);
      // console.log(typeof dagre.graphlib);
      // require('../../plugins/dagre.js');
      require('../../plugins/sigma.parsers.json.js');
      require('../../plugins/sigma.parsers.cypher.js');
      require('../../plugins/sigma.plugins.design.js');
      require('../../plugins/sigma.layout.dagre.js');


      var settings = {

      };

      var treePalette = {
      };

      var treeStyles = {
        nodes: {
          label: {
            by: 'neo4j_data.name',
            format: function(value) { return 'Name: ' + value; }
          },

          size: {
            by: 'neo4j_data.nodeType',
            bins: 10,
            min: 1,
            max: 20
          }


        }
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
            // console.log(design);
            // design.setPalette(treePalette);
            design.setStyles(treeStyles);
            design.apply();

            var config = {
              rankdir: 'TB'
            };

            var listener = sigma.layouts.dagre.configure(s, config);

            listener.bind('start stop interpolate', function(event) {
              console.log(event.type);
            });

            sigma.layouts.dagre.start(s);

            s.refresh();

          }
      );







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
