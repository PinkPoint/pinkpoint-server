var http = require('http');
var should = require('should');

describe('KletterzentrumService', function() {
	// it('should deliver some routes', function(done) {

	// 	var uri = 'http://www.kletterzentrum.com/ueber-uns/routenbau/routenfinder/?tx_kletroute_kletroutefilter%5Baction%5D=doFilter&tx_kletroute_kletroutefilter%5Bcontroller%5D=Route&tx_kletroute_kletroutefilter%5Bfilter%5D%5Blocation%5D=1&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B65%5D=0&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B10%5D=0&type=1390811741&tx_kletroute_kletroutefilter[offset]=0&tx_kletroute_kletroutefilter[limit]=20';

	// 	var callback = function(response) {
	// 		var routesFromKletterzentrum = '';

	// 		//another chunk of data has been recieved, so append it to `routesFromKletterzentrum`
	// 		response.on('data', function(chunk) {
	// 			routesFromKletterzentrum += chunk;
	// 		});

	// 		//the whole response has been recieved, so we just print it out here
	// 		response.on('end', function() {
	// 			// console.log(routesFromKletterzentrum);

	// 			var routesFromKletterzentrumParsed = JSON.parse(routesFromKletterzentrum);

	// 			// console.log(routesFromKletterzentrumParsed);

	// 			routesFromKletterzentrum.should.not.be.empty;

	// 			done();
	// 		});
	// 	};

	// 	http.get(uri, callback);
	// });

	it('should deliver some routes', function(done) {
		this.timeout(10000);
		
		var handleRoutes = function(routes) {

			// console.log(routes);
			console.log('KletterzentrumService delivered ' + routes.length + ' routes.');
			routes.should.be.array;
			routes.length.should.be.greaterThan(0);

			done();
		};

		var options = {
			callback: handleRoutes
		};

		Kletterzentrum.getRoutes(options);
	});

	it('should map all routes', function(done) {
		this.timeout(10000);
		
		var handleRoutes = function(routes) {

			// console.log(routes);
			console.log('KletterzentrumService delivered ' + routes.length + ' routes.');
			routes.should.be.array;
			routes.length.should.be.greaterThan(0);

			var mappedRoutes = Kletterzentrum.mapRoutes(routes);

			console.log(mappedRoutes);

			done();
		};

		var options = {
			callback: handleRoutes
		};

		Kletterzentrum.getRoutes(options);
	});
});