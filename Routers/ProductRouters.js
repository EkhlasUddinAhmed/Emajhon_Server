const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
const productSchema = require("../Schemas/ProductSchema");
const productModel = mongoose.model("Product", productSchema);

productRouter.get("/product", async (req, res) => {
  try {
    const pageIndex=req.query.pageIndex;
    const size=req.query.size;
    
    console.log("PageIndex is:",pageIndex);
    console.log("Size is:",size);
    const allProducts = await productModel.find()
                                          .limit(size)
                                          .skip(pageIndex*size);

    // const allDocument = await productModel.countDocuments({});
    // console.log("Number of Products are:", allDocument);
    res.status(200).send(allProducts);
    //  console.log("All Products are:",allProducts);
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log("Server side Error is Getting All Products:", {
      error: error.message,
    });
  }
});

module.exports = productRouter;
