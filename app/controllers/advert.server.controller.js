/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Advert = mongoose.model('Advert'),
    Sport = mongoose.model('Sport'),
    Region = mongoose.model('Region'),
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

var populateQuery = [{path: 'user', select: 'firstName lastName username'}, {
    path: 'sport',
    select: 'nazev'
}, {path: 'region', select: 'nazev'}];
exports.list = function (req, res) {
    Advert.find().sort('-created').populate(populateQuery).exec(function (err, adverts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(adverts);
        }
    });
};

exports.advertByID = function (req, res, next, username) {

    var advert;
    advert = {};

    var populateQuery = [{path: 'user', select: 'firstName lastName username vek prace pohlavi'}, {
        path: 'sport',
        select: 'nazev'
    }, {path: 'region', select: 'nazev'}];

    async.parallel({
        advert: function (callback) {
            return Advert.findOne({userName: username}).populate(populateQuery).exec(function (err, result) {
                return callback(err, result);
            });
        },
        sport_list: function (callback) {
            return Sport.find({}, function (err, result) {
                return callback(err, result);
            });
        },
        region_list: function (callback) {
            return Region.find({}, function (err, result) {
                return callback(err, result);
            });
        }
    }, function (err, advert) {
        advertArray = [];
        advertArray.push(advert);
        req.advert = advertArray;
        next();
    });

};

exports.read = function (req, res) {
    res.json(req.advert);
};


exports.update = function (req, res) {
    var advert = req.advert[0].advert;
    advert.created = req.body.created;
    advert.title = req.body.title;
    advert.advert = req.body.advert;
    advert.city = req.body.city;
    advert.user = req.body.user;
    advert.region = req.body.region;
    advert.userName = req.body.username;
    advert.sport = [];
    for (var i in req.body.sport) {
        advert.sport.push(req.body.sport[i]);
    }
    advert.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(advert);
        }
    });
};

exports.create = function (req, res) {
    var advert = new Advert(req.body);
    //console.log(advert);
    advert.userName = req.user.username;
    advert.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(advert);
        }
    });
};

exports.delete = function (req, res) {
    //var advert = req.advert[0].advert;
    //advert.userName = req.body;

    var advert = new Advert(req.body);

    advert.userName = req.advert[0].advert.userName;
    advert._id = req.advert[0].advert._id;

    //console.log(advert);

    advert.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(advert);
        }
    });
};