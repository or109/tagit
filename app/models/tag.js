var mongoose = require('mongoose');

module.exports = mongoose.model('Tag', {
    key: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    action: {
        type: String,
        default: ''
    },
    pic: {
        type: String,
        default: ''
    },
    msg: {
        type: String,
        default: ''
    },
    founds: {
        type: Array,
        default: ''
    }
});
