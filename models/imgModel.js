/**
 * Created by nina on 4/28/15.
 */
//img url
//src url
//uuid

/**
 * Created by nina on 4/24/15.
 */
var mongoose = require('mongoose');

var imgModel = mongoose.model('images',{

    img_url :{
        type: String,
        required: true

    },
    fired_url:{
        type: String,
        required: true

    },
    uuid:{
        type: String,
        required: true
    }
});

module.exports = imgModel;