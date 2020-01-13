'use strict'

module.exports = function (app) {
    var friendships = require('../controllers/friendships.server.controller.js')

    app.route('/friendships/show/:username').get(friendships.show);
    app.route('/friendships/follow').post(friendships.follow);
}