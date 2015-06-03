/**
 * Vytvořil Jaroslav Klimčík dne 31.3.2015.
 */
var mongoose = require('mongoose'),
    Message = mongoose.model('Message');

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
    var message = new Message(req.body);
    console.log(message);
    //message.creator = req.user;
    message.save(function (err) {
        if (err) return getErrorMessage(err);
        // saved!
    })
};

exports.list = function (req, res) {
    //Message.find({to: req.user.username})
    //    .select('from message created')
    //    .sort('-created')
    Message.aggregate(
        [
            // Matching pipeline, similar to find
            {
                "$match": {
                    "to": req.user.username
                }
            },
            // Sorting pipeline
            {
                "$sort": {
                    "created": -1
                }
            },
            // Grouping pipeline
            {
                "$group": {
                    "_id": "$from",
                    "message": {
                        "$first": "$message"
                    },
                    "created": {
                        "$first": "$created"
                    }
                }
            },
            // Project pipeline, similar to select
            {
                "$project": {
                    "_id": 0,
                    "from": "$_id",
                    "message": 1,
                    "created": 1
                }
            }
        ],
        function (err, messages) {
            // Result is an array of documents
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(messages)
            }
        }
    );


    //Message.find({to: req.user.username})
    //    .select('from message created')
    //    .sort('-created')
    //    .exec(function (err, messages) {
    //        if (err) {
    //            return res.status(400).send({
    //                message: getErrorMessage(err)
    //            });
    //        } else {
    //            res.json(messages)
    //        }
    //    });
};

exports.messageByID = function (req, res, next, username) {
    Message.find()
        .or([
            {$and: [{from: username}, {to: req.user.username}]},
            {$and: [{from: req.user.username}, {to: username}]}
        ])
        .populate('friends', 'lastName firstName username')
        .sort('-created').exec(function (err, message) {
            if (err) return next(err);
            if (!message) return next(new Error('Failed to load message from ' + username));
            req.message = message;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.message);
};