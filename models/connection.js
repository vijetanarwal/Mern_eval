const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vijetanarwal4044:qAcwsJnm7S0oY37K@cluster0.roq0v10.mongodb.net/')
.then(() => console.log('Mongo is connected'))
.catch((err) => console.log(err));