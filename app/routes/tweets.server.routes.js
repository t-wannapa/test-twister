'use strict';

module.exports = function (app) {
    var tweets = require('../controllers/tweets/tweets.server.controller');

    app.route('/statuses/update').post(tweets.update);
    app.route('/statuses/me_timeline').get(tweets.me_timeline);
    app.route('/statuses/user_timeline/:username').get(tweets.user_timeline);
    app.route('/statuses/feed_timeline').get(tweets.feed_timeline);

}