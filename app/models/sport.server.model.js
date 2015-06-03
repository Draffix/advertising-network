/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SportSchema = new Schema({
    nazev: {
        type: String,
        default: '',
        required: 'Název sportu musí být vyplněn'
    }
});
mongoose.model('Sport', SportSchema);