var http = require('http');
var Promise = require('bluebird');

exports.request = Promise.method(function(options) {
  return new Promise(function(resolve, reject) {
    var request = http.request(options, function(response) {
      // Bundle the result
      var result = {
        'httpVersion': response.httpVersion,
        'httpStatusCode': response.statusCode,
        'headers': response.headers,
        'body': '',
        'trailers': response.trailers
      };

      // Build the body
      response.on('data', function(chunk) {
        // console.log(chunk);
        result.body += chunk;
      });

      // Resolve the promise when the response ends
      response.on('end', function() {
        resolve(result);
      });
    });

    // Handle errors
    request.on('error', function(error) {
      console.log('Problem with request:', error.message);
      reject(error);
    });

    // Must always call .end() even if there is no data being written to the request body
    request.end();
  });
});
