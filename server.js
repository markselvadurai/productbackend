require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


PORT = process.env.PORT

mongoose.connect(process.env.URI, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to MongoDB"));

app.use(express.json());

const productRouter = require('./routes/products');
app.use('/api/products', productRouter);

const defaultRouter = require('./routes/default');
app.use('', defaultRouter);

app.listen(PORT, () => {
    console.log(`Server has started on Port: ${ PORT }`)
});