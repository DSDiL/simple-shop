const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ProductRoutes = require("./routes/products")
const InvoiceDetailsRoutes = require("./routes/invoiceDetails");
const InvoiceRoutes = require("./routes/invoice")

const app = express();

app.use(express.json());
app.use(cors());

const DB_CONNECTION = "mongodb+srv://user:1234@intern.dohct84.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION);

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('successfully connected');
})

app.listen(5000);

app.use('/api/products', ProductRoutes);
app.use('/api/details', InvoiceDetailsRoutes);
app.use('/api/invoice', InvoiceRoutes);