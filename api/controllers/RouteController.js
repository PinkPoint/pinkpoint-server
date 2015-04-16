/**
 * RouteController
 *
 * @description :: Server-side logic for managing routes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	import: function (req, res) {
    var success = function(){
      return res.send('I did it baby!');
    };

    var fail = function(e) {
      return res.send('epic fail: ' + e);
    };

		Kletterzentrum.importRoutes()
      .then(success)
      .catch(fail);
	}
};

