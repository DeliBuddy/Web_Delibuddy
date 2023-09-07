const express = require('express');
const {Order} = require('./models/order');
const partnerRouter = express.Router();
const Seller= require('./models/seller');
const {Chat} = require('./models/chat');

partnerRouter.post('/sendOrderToPartner', async (req, res) => {
    const { order } = req.body;
    const io = req.app.get('io');
    
    try {
        
        const seller = await Seller.findById(order.seller._id);

        //change the seller's order array status to waiting
        seller.orders= seller.orders.map(item=>{
            if(item._id.toString()===order._id.toString()){
                item.status='waiting';
            }
            return item;
        });
        await seller.save();

        const updatedOrder=await Order.findById(order._id);
        updatedOrder.status='waiting';
        await updatedOrder.save();

        io.to('joinPartnerRoom').emit('newOrder',updatedOrder);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
    });

partnerRouter.post('/orderIgnored', async (req, res) => {
    const { order } = req.body;
    const io = req.app.get('io');
    try {

        const newOrder=await Order.findById(order._id);
        newOrder.status='ignored';
        await newOrder.save();

        const seller = await Seller.findById(order.seller._id);
        seller.orders= seller.orders.map(item=>{
            if(item._id.toString()===order._id.toString()){
                item.status='ignored';
            }
            return item;
        });
        await seller.save();

        io.to('joinPartnerRoom').emit('orderIgnored',newOrder);
        res.status(200).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

   

    partnerRouter.post('/acceptOrder', async (req, res) => {
        const { order,partner } = req.body;
        const io = req.app.get('io');
        try {
            const partnerOtp=Math.floor(100000 + Math.random() * 900000);
            const userOtp=Math.floor(100000 + Math.random() * 900000);


            const newOrder=await Order.findById(order._id);
            newOrder.status='forwarded';
            newOrder.partner=partner;
            newOrder.partnerOtp=partnerOtp;
            newOrder.userOtp=userOtp;
            await newOrder.save();

            //generte otp
          
            const seller = await Seller.findById(order.seller._id);
            seller.orders= seller.orders.map(item=>{
                if(item._id.toString()===order._id.toString()){
                    item.status='forwarded';
                    item.partner=partner;
                    item.partnerOtp=partnerOtp;
                    item.userOtp=userOtp;
                }
                return item;
            });
            await seller.save();

            //create chat room
            const chat=new Chat({
                roomId:order._id,
                messages:[]
            });
            await chat.save();

            //send message to user and redirect to chat page
            io.to(order._id).emit('orderAccepted',newOrder);
            io.to(order.seller._id).emit('orderForwarded',newOrder);

            //send message to partner that order has been accepted by some partner
            io.to('joinPartnerRoom').emit('orderAccepted',newOrder);

            res.status(200).json(newOrder);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }

    });

  
    partnerRouter.get('/getOrders', async (req, res) => {

        try {
            const orders = await Order.find({ status: 'waiting' });
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    });

module.exports = partnerRouter;