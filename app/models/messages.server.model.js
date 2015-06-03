/**
 * Vytvořil Jaroslav Klimčík dne 31.3.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        default: '',
        required: 'Zpráva nesmí být prázdná'
    },
    from: {
        type: String
    },
    to: {
        type: String
    }
});
mongoose.model('Message', MessageSchema);