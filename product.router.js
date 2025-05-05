const express = require('express');
let productRouter = express.Router();
const {getAllProducts,getProductById, createProduct, updateProduct, deleteProduct} = require("./product.controller.js");
const{ check } = require("express-validator");



productRouter.get("/",getAllProducts);
productRouter.get("/:id",getProductById);
productRouter.post("/",createProduct);
productRouter.patch("/:id",updateProduct);
productRouter.delete("/:id",deleteProduct);

module.exports = productRouter;