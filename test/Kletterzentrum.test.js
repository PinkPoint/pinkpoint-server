// todo: configure mocha in order to allow recursive test file organization

var http = require('http');
var should = require('should');

describe('KletterzentrumService', function() {

	it('should get routes', function(done) {
		this.timeout(10000);
		
		var handleRoutes = function(routes) {

			// console.log(routes);
			// console.log('KletterzentrumService delivered ' + routes.length + ' routes.');
			
			routes.should.be.array;
			routes.length.should.be.greaterThan(0);

			done();
		};

		var options = {
			callback: handleRoutes
		};

		Kletterzentrum.getRoutes(options);
	});

	it('should map routes', function(done) {
		this.timeout(10000);
		
		var handleRoutes = function(routes) {

			// console.log(routes);
			// console.log('KletterzentrumService delivered ' + routes.length + ' routes.');
			
			routes.should.be.array;
			routes.length.should.be.greaterThan(0);

			var mappedRoutes = Kletterzentrum.mapRoutes(routes);

			// console.log(mappedRoutes);

			done();
		};

		var options = {
			callback: handleRoutes
		};

		Kletterzentrum.getRoutes(options);
	});

	it('should import routes', function(done) {
		this.timeout(10000);
		
		Kletterzentrum.importRoutes();

		// todo: how to wait for the end of the import?
		// done();
	});
});