//write an api to fetch the list of all sellers

const express = require("express");
const Seller = require("./models/seller");
const sellerRouter = express.Router();
const {Order} = require("./models/order");

sellerRouter.get("/getSellers", async (req, res) => {
    try {
        const sellers = await Seller.find({});
        res.status(200).json(sellers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
});


sellerRouter.post("/prepareOrder", async (req, res) => {
    const { order} = req.body;
    try {
        const updatedOrder= await Order.findById(order._id);
        updatedOrder.status = "prepared";
        await updatedOrder.save();

        const seller= await Seller.findById(order.seller._id);
        seller.orders= seller.orders.map(item=>{
            if(item._id.toString()===order._id.toString()){
                item.status='prepared';
            }
            return item;
        });
        await seller.save();

        
        const io = req.app.get('io');
        io.to(order._id).emit('orderPrepared');
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to prepare order" });
    }
});

module.exports= sellerRouter;