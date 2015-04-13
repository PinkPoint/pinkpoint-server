// Kletterzentrum.js - in api/services
// todo: promisify, e.g. like this https://github.com/petkaantonov/bluebird/issues/196
exports.getRoutes = function(options) {
    var http = require('http');

    var requestOptions = {
        host: 'www.kletterzentrum.com',
        path: '/ueber-uns/routenbau/routenfinder/?tx_kletroute_kletroutefilter%5Baction%5D=doFilter&tx_kletroute_kletroutefilter%5Bcontroller%5D=Route&tx_kletroute_kletroutefilter%5Bfilter%5D%5Blocation%5D=1&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B65%5D=0&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B10%5D=0&type=1390811741&tx_kletroute_kletroutefilter[offset]=0&tx_kletroute_kletroutefilter[limit]=1000'
    };

    var callback = function(response) {
        var routesFromKletterzentrum = '';

        //another chunk of data has been recieved, so append it to `routesFromKletterzentrum`
        response.on('data', function(chunk) {
            routesFromKletterzentrum += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            var routes = JSON.parse(routesFromKletterzentrum);
            options.callback(routes.items);
        });
    };

    http.request(requestOptions, callback).end();
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
    var options = {
        callback: function(routesFromKletterzentrum) {
            var routes = Kletterzentrum.mapRoutes(routesFromKletterzentrum);

            routes.forEach(function(route) {
                Route.findOrCreate({ sourceId: route.sourceId }, route).exec(function createFindCB(err, record){
                    if (!err){
                        // todo: how to differ between found or create?
                        console.log('Processed route ' + record.name);
                    } else {
                        console.log('Error ' + err);
                    };
                });
            });
        }
    };

    Kletterzentrum.getRoutes(options);
};