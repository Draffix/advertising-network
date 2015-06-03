/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdvertSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Název nemůže být prázdný'
    },
    advert: {
        type: String,
        default: '',
        required: 'Inzerát nemůže být prázdný'
    },
    city: {
        type: String,
        default: '',
        required: 'Město nemůže být prázdné'
    },
    sport: [{
        type: Schema.ObjectId,
        ref: 'Sport'
    }],
    region: {
        type: Schema.ObjectId,
        ref: 'Region'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: 'Musí být vyplněna přezdívka uživatele'
    }
});

mongoose.model('Advert', AdvertSchema);