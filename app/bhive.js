var request = require('request');
var config = require('./config');

module.exports = function(req, res, next) {

    var endpoint = config.bhive_endpoint;
    console.log('endpoint', config.bhive_endpoint);
    var bhive_url = 'http://' + endpoint + '/' + req.query.url;
    var qs = {
        pathLike: req.query.pathLike,
        path: req.query.path,
        skip: req.query.skip,
        maxResults: req.query.maxResults,
        v: req.query.v
    };

    console.log('bhive url', bhive_url, qs);

    request.get({
        url: bhive_url,
        qs: qs,
        json: true
    },
    function(error, response, body) {
        console.log('bhive project query', error);
        res.jsonp(body);
        next();
    });
};
