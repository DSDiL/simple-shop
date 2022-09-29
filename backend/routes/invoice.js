const express = require("express");
let Invoice = require("../models/invoice");

const router = express.Router();

router.get('/id', async (req, res) => {

    await Invoice.findOne().sort({'id': -1}).limit(1).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/', async (req, res) => {
    
    const { id, today, result, name } = req.body;

    const date = today;
    const total = today;

    const invoice = new Invoice ({
        id,
        date,
        total,
        name
    })

    await invoice.save().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/:from/:to', async (req, res) => {

    const dateFrom = req.params.from;
    const dateTo = req.params.to;

    console.log(dateFrom);
    console.log(dateTo);

    await Invoice.find({'date': {$gt: `${dateFrom}`, $lt: `${dateTo}`}}).then((result) => {
        res.json(result);
        console.log(result)
    }).catch((err) => {
        console.log(err);
    })  
})

module.exports = router;
