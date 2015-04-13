/**
 * RouteController
 *
 * @description :: Server-side logic for managing routes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	import: function (req, res) {
		Kletterzentrum.importRoutes();

		return res.send('I did it baby!');
	},
};

