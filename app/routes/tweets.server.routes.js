'use strict';

module.exports = function (app) {
    var tweets = require('../controllers/tweets/tweets.server.controller');

    app.route('/statues/update').post(tweets.update);
}