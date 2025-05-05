const  mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
let productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:["softToy1","softToy2","softToy3"],
        required:true
    }
})

const productModel = mongoose.model('Product',productSchema);
module.exports = productModel;