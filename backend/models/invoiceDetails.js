const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvoiceDetailsSchema = new Schema ({
    qty: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    }
})

const InvoiceDetails = mongoose.model('InvoiceDetails', InvoiceDetailsSchema);

module.exports = InvoiceDetails;