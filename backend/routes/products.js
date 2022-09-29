const express = require("express");
let Product = require("../models/products");

const router = express.Router();

router.post('/', async (req, res) => {
    
    const {id, name, price, qty} = req.body;

    const product = new Product ({
        id,
        name,
        price,
        qty
    })

    await product.save().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id;

    await Product.findOne({'id': `${id}`}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;