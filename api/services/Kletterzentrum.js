// Kletterzentrum.js - in api/services
exports.getRoutes = function() {
  var params = {
    host: 'www.kletterzentrum.com',
    path: '/ueber-uns/routenbau/routenfinder/?tx_kletroute_kletroutefilter%5Baction%5D=doFilter&tx_kletroute_kletroutefilter%5Bcontroller%5D=Route&tx_kletroute_kletroutefilter%5Bfilter%5D%5Blocation%5D=1&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B65%5D=0&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B10%5D=0&type=1390811741&tx_kletroute_kletroutefilter[offset]=0&tx_kletroute_kletroutefilter[limit]=1000'
  };

  function parseRoutes(result) {
    var routes = JSON.parse(result.body);
    return routes.items;
  }

  return PromiseHttp
    .request(params)
    .then(parseRoutes);
};

exports.mapRoute = function(source) {
    return {
        buildDate: source.builddateFormatted,
        builder: source.builders,
        difficulty: source.difficulty,
        difficultyColor: source.difficultyColor,
        gripColor: source.gripcolor,
        name: source.title,
        sector: source.sector,
        sourceId: source.uid,
        tag: source.nr
    };
};

exports.mapRoutes = function(routes) {
    return routes.map(Kletterzentrum.mapRoute);
};

exports.importRoutes = function() {
  var mapAndSaveRoutes = function(routesFromKletterzentrum) {
    var routes = Kletterzentrum.mapRoutes(routesFromKletterzentrum);

    var createRouteIfNotExists = function(route) {
      var logResult = function (err, record){
        if (!err){
          // todo: how to differ between found or create?
          console.log('Processed route ' + record.name);
        } else {
          console.log('Error ' + err);
        };
      };

      Route.findOrCreate({ sourceId: route.sourceId }, route)
        .exec(logResult);
    };

    routes.forEach(createRouteIfNotExists);
  };

  return Kletterzentrum
    .getRoutes()
    .then(mapAndSaveRoutes);
};
