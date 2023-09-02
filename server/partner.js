const express = require('express');
const {Order} = require('./models/order');
const partnerRouter = express.Router();
const Seller= require('./models/seller');
partnerRouter.post('/sendOrderToPartner', async (req, res) => {
    const { order } = req.body;
    const io = req.app.get('io');
    
    try {
        io.to('joinPartnerRoom').emit('newOrder',order);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
    });

   

    partnerRouter.post('/acceptOrder', async (req, res) => {
        const { order,partner } = req.body;
        const io = req.app.get('io');
        try {
            const newOrder=await Order.findById(order._id);
            newOrder.status='forwarded';
            newOrder.partner=partner;
            await newOrder.save();
            //send message to user and redirect to chat page
            io.to(order._id).emit('orderAccepted',newOrder);
            io.to(order.seller._id).emit('orderForwarded',newOrder);

            //find the seller and updates its orders list

            const seller = await Seller.findById(order.seller._id);
            seller.orders.push(newOrder);
            await seller.save();

            res.status(200).json(newOrder);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }

    });

  
    partnerRouter.get('/getOrders', async (req, res) => {

        try {
            const orders = await Order.find({ status: 'accepted' });
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    });

module.exports = partnerRouter;