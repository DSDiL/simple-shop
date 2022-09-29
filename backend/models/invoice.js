const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;