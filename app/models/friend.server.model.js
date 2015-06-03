/**
 * Vytvořil Jaroslav Klimčík dne 6.4.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FriendSchema = new Schema({
    friends: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    userName: {
        type: String
    }
});

mongoose.model('Friend', FriendSchema);