/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegionSchema = new Schema({
    nazev: {
        type: String,
        default: '',
        required: 'Název regionu musí být vyplněn'
    }
});

mongoose.model('Region', RegionSchema);