const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;