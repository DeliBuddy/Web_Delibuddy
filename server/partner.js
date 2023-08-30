const express = require('express');
const Order = require('./models/order');
const partnerRouter = express.Router();

partnerRouter.post('/sendOrderToPartner', async (req, res) => {
    const { orderId } = req.body;
    const io = req.app.get('io');
    
    try {
        //remove the below line, orderDetails would be sent from user side
        //using statemanagement techniques, not retrived with Mongodb evertime
        const order=await Order.findById(orderId);
        io.to('joinPartnerRoom').emit('newOrder',order);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
    });

   

    partnerRouter.post('/acceptOrder', async (req, res) => {
        const { orderId } = req.body;
        const io = req.app.get('io');
        try {
            const order=await Order.findById(orderId);
            order.status='forwarded';
            await order.save();
            //send message to user and redirect to chat page
            res.status(200).json(order);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }

    });
module.exports = partnerRouter;