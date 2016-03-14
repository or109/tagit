var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: ''
    },
    bday: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
});