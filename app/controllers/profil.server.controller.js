/**
 * Vytvořil Jaroslav Klimčík dne 2.4.2015.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Advert = mongoose.model('Advert'),
    Friend = mongoose.model('Friend');
async = require("async");


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

exports.userByUsername = function (req, res, next, username) {
    //User.find({username: username}).exec(function (err, user) {
    //    if (err) return next(err);
    //    if (!user) return next(new Error('Failed to load user ' + username));
    //    req.profil = user;
    //    next();
    //});

    var populateQuery = [
        {path: 'user', select: 'firstName lastName username vek prace pohlavi email'},
        {path: 'sport', select: 'nazev'},
        {path: 'region', select: 'nazev'}
    ];

    //Advert.find().sort('-created').populate(populateQuery).exec(function (err, adverts) {
    //    if (err) {
    //        return res.status(400).send({
    //            message: getErrorMessage(err)
    //        });
    //    } else {
    //        var result = [];
    //        for (var index = 0; index < adverts.length; index++) {
    //            var item = adverts[index];
    //            if (item.user.username === username) {
    //                result.push(item);
    //            }
    //        }
    //        req.profil = result;
    //        next();
    //    }
    //});

    async.parallel({
        profil: function (callback) {
            return Advert.find().sort('-created').populate(populateQuery).exec(function (err, result) {
                var resultArray = [];
                for (var index = 0; index < result.length; index++) {
                    var item = result[index];
                    if (username && item.user) {
                        if (item.user.username == username) {
                            resultArray.push(item);
                        }
                    }
                }
                return callback(err, resultArray);
            });
        },
        friends: function (callback) {
            return Friend.find({userName: username}).populate('friends', 'lastName firstName username').exec(function (err, result) {
                return callback(err, result);
            });
        },
        user: function (callback) {
            return User.find({username: username}, 'firstName lastName username vek prace pohlavi email').exec(function (err, result) {
                return callback(err, result);
            });
        }
    }, function (err, result) {
        resultArray = [];
        resultArray.push(result);
        req.profil = resultArray;
        next();
    });

};

exports.read = function (req, res) {
    res.json(req.profil);
};

exports.update = function (req, res) {

    User.findOne({_id: req.body._id}, function (err, user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.vek = req.body.vek;
        user.prace = req.body.prace;
        user.pohlavi = req.body.pohlavi;
        user.email = req.body.email;

        user.save(function (err) {
            if (err) {
                return res.status(400).send({
                    user: getErrorMessage(err)
                });
            } else {
                res.json(user);
            }
        });
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.profil[0].user[0]._id != req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};