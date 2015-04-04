describe('Kletterzentrum', function() {
	it('should deliver some routes', function(done) {
		var http = require('http');
		var should = require('should');

		//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
		var options = {
			host: 'www.kletterzentrum.com',
			path: '/ueber-uns/routenbau/routenfinder/?tx_kletroute_kletroutefilter%5Baction%5D=doFilter&tx_kletroute_kletroutefilter%5Bcontroller%5D=Route&tx_kletroute_kletroutefilter%5Bfilter%5D%5Blocation%5D=1&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B65%5D=0&tx_kletroute_kletroutefilter%5Bfilter%5D%5Bcategory%5D%5B10%5D=0&type=1390811741&tx_kletroute_kletroutefilter[offset]=0&tx_kletroute_kletroutefilter[limit]=20'
		};

		var callback = function(response) {
			var routesFromKletterzentrum = '';

			//another chunk of data has been recieved, so append it to `routesFromKletterzentrum`
			response.on('data', function(chunk) {
				routesFromKletterzentrum += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function() {
				console.log(routesFromKletterzentrum);

				routesFromKletterzentrum.should.not.be.empty;

				done();
			});
		};

		http.request(options, callback).end();

		// User.find().exec(function(err, users) {
		// 	console.log("test start");

		// 	console.log(users);
		// 	users.length.should.not.be.eql(0);

		// 	done();
		// });
	});
});