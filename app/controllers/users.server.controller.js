/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].
                message;
        }
    }
    return message;
};

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.list = function (req, res) {
    User.find().sort('firstName lastName').exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(users);
        }
    });
};

exports.userByID = function (req, res, next, id) {
    User.findById(id).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.user);
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

exports.delete = function (req, res) {

    var user = req.user;
    user.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username ||
                    ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null,
                    function (availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);
                        user.save(function (err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return res.redirect('/signup');
                            }
                            return done(err, user);
                        });
                    });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};