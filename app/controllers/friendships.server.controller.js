'use strict';

var mongoose = require('mongoose');
var Following = mongoose.model('Following');
var Follower = mongoose.model('Follower');

exports.show = function (req, res, next) {
    var is_following = false;
    var is_followed = false;

    if (req.user) {
        // Find is_following
        Following.findOne({
            username: req.user.username,
            followings: req.params.username
        }, function (err, following) {
            if (err) {
                return res.status(400).send({
                    message: 'Error'
                });
            }

            if (following) {
                is_following = true;
            } else {
                is_following = false;
            }

            // Find is_followed
            Follower.findOne({
                username: req.user.username,
                followers: req.params.username
            }, function (err, follower) {
                if (err) {
                    return res.status(400).send({
                        message: 'Error'
                    });
                }

                if (follower) {
                    is_followed = true;
                } else {
                    is_followed = false;
                }

                res.json({
                    is_following: is_following,
                    is_followed: is_followed
                });
            });
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        })
    }
}


exports.follow = function (req, res, next) {
    if (req.user) {
        var username = req.user.username;
        var followUsername = req.body.follow_username;
        Following.findOneAndUpdate(
            { username: username }, // condition
            { $addToSet: { followings: followUsername}}, // add to set with not exist
            { upsert: true }, // update or insert to collection
            function (err, following) {
                if (err) {
                    return res.status(400).send({
                        message: 'error'
                    });
                }
                
                Follower.findOneAndUpdate(
                    { username: followUsername },
                    { $addToSet: { followers: username }},
                    { upsert: true },
                    function (err, follower) {
                        if (err) {
                            return res.status(400).send({
                                message: 'error'
                            });
                        }

                        res.json({
                            is_following: true
                        })
                    }
                )
            });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        })
    }
}

exports.unfollow = function (req, res, next) {
    if (req.user) {
        var username = req.user.username;
        var unfollowUsername = req.body.unfollow_username;

        Following.update(
            { username: username },
            { $pull: { followings: unfollowUsername }},
            function (err, following) {
                if (err) {
                    return res.status(400).send({
                        message: 'Error'
                    });
                }

                Follower.update(
                    { username: unfollowUsername },
                    { $pull: { followers: username }},
                    function (err, follower) {
                        if (err) {
                            return res.status(400).send({
                                message: 'Error'
                            });
                        }

                        res.json({
                            is_following: false
                        })
                    }
                )
            }
        )
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        })
    }
}