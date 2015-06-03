/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Sport = mongoose.model('Sport'),
    Advert = mongoose.model('Advert');

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

exports.create = function (req, res) {
    var sport = new Sport(req.body);
    sport.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(sport);
        }
    });
};

exports.list = function (req, res) {
    Sport.find().sort('nazev').exec(function (err, sports) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(sports);
        }
    });
};

exports.sportById = function (req, res, next, id) {
    Sport.findById(id).exec(function (err, sport) {
        if (err) return next(err);
        if (!sport) return next(new Error('Failed to load sport ' + id));
        req.sport = sport;
        next();
    });
};

var populateQuery = [{path: 'user', select: 'firstName lastName username'}, {
    path: 'sport',
    select: 'nazev'
}, {path: 'region', select: 'nazev'}];
exports.sportAdvertsById = function (req, res, next, id) {
    //console.log(id);
    Advert.find({sport: {"$in": [id]}}).sort('-created').populate(populateQuery).exec(function (err, adverts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(adverts);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.sport);
};

exports.update = function (req, res) {

    Sport.findOne({_id: req.body._id}, function (err, sport) {
        sport.nazev = req.body.nazev;

        sport.save(function (err) {
            if (err) {
                return res.status(400).send({
                    sport: getErrorMessage(err)
                });
            } else {
                res.json(sport);
            }
        });
    });
};

exports.delete = function (req, res) {

    var sport = req.sport;
    sport.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(sport);
        }
    });
};