/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Region = mongoose.model('Region'),
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
    var region = new Region(req.body);
    region.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(region);
        }
    });
};

exports.list = function (req, res) {
    Region.find().sort('nazev').exec(function (err, regions) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(regions);
        }
    });
};

var populateQuery = [{path: 'user', select: 'firstName lastName username'}, {
    path: 'sport',
    select: 'nazev'
}, {path: 'region', select: 'nazev'}];
exports.regionAdvertsById = function (req, res, next, id) {
    //console.log(id);
    Advert.find({region: id}).sort('-created').populate(populateQuery).exec(function (err, adverts) {
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
    res.json(req.region);
};