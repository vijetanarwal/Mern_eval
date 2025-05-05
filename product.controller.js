let {validationResult} = require('express-validator')
let productModel = require("./models/product.js");
let mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId


let createProduct = async(req,res)=>{
    try {
        console.log(req.body)
        let body = req.body;
        const errors = validationResult(req);
        if(errors && errors.length) {
            console.log(errors)
        }
        let product = new productModel({
            name: body.name,
            desc: body.desc,
            price: body.price,
            category: body.category
        })
        await product.save()
        res.status(201).json({success:true,message:"Product Created successfully"});
    }
    catch(err) {
        res.status(400).json({success:false,message:err.message});
    }
}

let getAllProducts = async (req,res)=>{
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;
    let category = req.query.category;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let query = {}
    if(category && category != "") {
        query["category"] = category
    }
    if((minPrice && minPrice > 0) || (maxPrice && maxPrice > 0) ) {
        if(minPrice && maxPrice  && minPrice > maxPrice) {
            return res.status(400).json({success:false,message:"minPrice is smaller than maxPrice"})
        }
        if(minPrice && maxPrice) {
           query["$and"] = [{ price:{$gte: minPrice} }, { price:{$lt: maxPrice} }];
        }
        else if(minPrice && !maxPrice) {
            query["price"] = {$gte:minPrice}
        }
        else if(maxPrice && !minPrice) {
            query["price"] = {$lte:maxPrice}
        }
    }
    let allProducts = await productModel.find(query).skip(skip).limit(limit);
    res.status(200).json({success:true,message:"Products fetched successfully",data:allProducts})
}

let getProductById = async (req,res)=>{
    var productId = req.params.id;
    let product = await productModel.findById(productId)
    if(!product) {
        res.status(404).json({success:false,"message":"Product not found"})
    }
    res.status(200).json({success:true,message:"Product fetched successfully",data:product})
}



let updateProduct = async(req,res)=>{
    let productId = req.params.id;
    let newDesc = req.body.desc;
    let newPrice = req.body.price;
    let product = await productModel.findById(productId)
    if(newDesc && newDesc != "")
    {
        product.desc = newDesc
    }
    if(newPrice && newPrice > 0)
    {
        product.price = newPrice
    }
    await product.save()
    res.status(200).json({success:true,message:"Product Updated successfully"})
}

let deleteProduct = async(req,res) => {
    let productId = req.params.id;
    await productModel.deleteOne({_id:new ObjectId(productId)})
    res.status(200).json({success:true,message:"Product Deleted successfully"})
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}