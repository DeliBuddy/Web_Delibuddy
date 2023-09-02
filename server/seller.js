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

// const orderPrepared = async (order: Order) => {
//     try {
//       const response = await fetch(`http://localhost:3696/seller/prepareOrder`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderId: order._id,
//           sellerId: seller._id,
//         }),
//       });
      
//       if (response.ok) {
//         const updatedOrders = orders.filter((order) => order._id !== order._id);
//         setOrders(updatedOrders);
//       } else {
//         console.error('API call failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('API call error:', error);
//     }
//   };

//write api for the above front end code
sellerRouter.post("/prepareOrder", async (req, res) => {
    const { orderId} = req.body;
    try {
        const temp= await Order.findById(orderId);
        temp.status = "prepared";
        await temp.save();
        
        const io = req.app.get('io');
        io.to(orderId).emit('orderPrepared');
        res.status(200).json({ message: "Order Prepared" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to prepare order" });
    }
});

module.exports= sellerRouter;