/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	ascents: function (req, res) {
    var userId = req.param('userId');

    Ascent.find({'climber': userId})
      .populate('route')
      .exec(function (err, ascents) {
      if (!err){
        res.send(ascents);
      } else {
        res.send(error);
      }
    });
	}
};

