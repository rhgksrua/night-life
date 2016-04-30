'use stict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    id: String,
    display_phone: String,
    image_url: String,
    name: String,
    rating_img_url: String,
    rating_img_url_large: String,
    rating_img_url_small: String,
    review_count: Number,
    snippet_image_url: String,
    snippet_text: String,
    url: String,
    going: [
        {
            userId: String,
            date: { 
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Bar', Bar);