/**
 * Vytvořil Jaroslav Klimčík dne 6.4.2015.
 */
var mongoose = require('mongoose'),
    Friend = mongoose.model('Friend');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.friendsByUsername = function (req, res, next, username) {
    Friend.find({userName: username}).populate('friends', 'lastName firstName username').exec(function (err, friends) {
        if (err) return next(err);
        if (!friends) return next(new Error('Failed to load article ' + id));
        req.friends = friends;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.friends);
};

exports.create = function (req, res) {
    Friend.findOne(
        {'userName': req.body.username}, function (err, result) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                result.friends.push(req.body.friendId);
                result.markModified('friends');
                result.save();
                res.json(result);
            }
        });
};

exports.update = function (req, res) {
    Friend.findOne(
        {'_id': req.body.friendsId}, function (err, result) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                var index = result.friends.indexOf(req.body.friendId);
                if (index > -1) {
                    result.friends.splice(index, 1);
                    result.markModified('friends');
                    result.save();
                }
                res.json(result);
            }
        });
};