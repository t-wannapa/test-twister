'use strict';

var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var Following = mongoose.model('Following');

exports.update = function (req, res, next) {
    if (req.user) {
        var tweet = new Tweet(req.body);
        tweet.save(function (err) {
            if (err) {
                res.status(400).send({
                    message: 'error'
                });
            } else {
                res.json(tweet);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        })
    }
};

async function getFollowing(username) {

    return new Promise(function (resolve, reject) {
        Following.findOne({
            username: username
        }, function (err, following) {
            if (err)  reject(new Error(err));
            resolve(following);
        });
    });
}

 function getTweet(username, following) {
    var followings = following ? following.followings : [];

    return new Promise(function (resolve, reject) {
        Tweet.find({
                $or: [ { screenName: { $all: followings } }, { screenName: username } ] 
        }, function (err, tweets) {
            if (err)  reject(new Error(err));
            resolve(tweets);
        });
    });
}

exports.feed_timeline = function (req, res, next) {
    if (req.user) {
        var username = req.user.username;
        getFollowing(username)
            .then((following) => getTweet(username, following))
            .then((tweets) => res.json(tweets))
            .catch(function (err) {
                console.log('Caught an error!', err);
            });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        })
    }
}

exports.me_timeline = function (req, res, next) {
    if (req.user) {
        var username = req.user.username;
        getTweet(username, [])
            .then((tweets) => res.json(tweets))
            .catch(function (err) {
                console.log('Caught an error!', err);
            });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};


exports.user_timeline = function (req, res, next) {
    if (req.user) {
        var username = req.params.username;

        getTweet(username, [])
            .then((tweets) => res.json(tweets))
            .catch(function (err) {
                console.log('Caught an error!', err);
            });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};