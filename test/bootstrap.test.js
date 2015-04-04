var Sails = require('sails');

  // Global before hook
  before(function (done) {

    // apparently the default timeout of mocha is 2000ms and it seems
    // to take longer to lift sails, that's why we raise the timeout here:
    this.timeout(10000);

    // Lift Sails with test database
    Sails.lift({
      log: {
        level: 'error'
      },
      models: {
        connection: 'test',
        migrate: 'drop'
      }
    }, function(err) {
      if (err)
        return done(err);

      // Anything else you need to set up
      // ...

      done();
    });
  });

  // Global after hook
  after(function (done) {
    console.log(); // Skip a line before displaying Sails lowering logs
    Sails.lower(done);
  });