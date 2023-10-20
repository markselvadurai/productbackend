const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        enum: ['Men','Women','Teens'],
        required: true
    }
});


module.exports = mongoose.model('Product', productSchema);