const express = require("express");
let InvoiceDetails = require("../models/invoiceDetails");

const router = express.Router();

router.post('/', async (req, res) => {
    
    const {qty, price, id, itemID} = req.body;

    const amount = parseInt(qty) * parseInt(price);

    const invoiceDetails = new InvoiceDetails ({
        qty,
        amount,
        id,
        itemID
    })

    await invoiceDetails.save().then(() => {
        
        InvoiceDetails.find({'id': `${id}`}).then((result) => {
            res.json(result);
        })

    }).catch((err) => {
        console.log(err);
    })
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    await InvoiceDetails.deleteMany({'id': `${id}`}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;
