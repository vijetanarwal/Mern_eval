const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('./models/connection.js');

let productRouter = require('./product.router.js');


app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

app.use('/product', productRouter);



app.use((req, res) => {
    res.status(404).send(`<html>
    <head><title>404</title></head>
    <body><h1>404 - Not Found</h1></body>
</html>`);
});


app.listen(5004, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on port 5004");
    }
});


//qAcwsJnm7S0oY37K