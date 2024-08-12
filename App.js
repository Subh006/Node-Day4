const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Product Database');
});

app.get('/products', db.getProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.updateProduct)
app.delete('/products/:id', db.deleteProduct)

app.listen(6199, () => {
    console.log(`Server is running on http://localhost:6199`);
});