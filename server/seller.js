//write an api to fetch the list of all sellers

const express = require("express");
const Seller = require("./models/seller");
const sellerRouter = express.Router();

sellerRouter.get("/getSellers", async (req, res) => {
    try {
        const sellers = await Seller.find({});
        res.status(200).json(sellers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
});

module.exports= sellerRouter;