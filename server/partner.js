const express = require('express');
const Order = require('./models/order');
const partnerRouter = express.Router();

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
        const { order } = req.body;
        const io = req.app.get('io');
        try {
            const newOrder=await Order.findById(order._id);
            newOrder.status='forwarded';
            await newOrder.save();
            //send message to user and redirect to chat page
            io.to(order._id).emit('orderAccepted',newOrder);
            res.status(200).json(newOrder);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create order' });
        }

    });

    // useEffect(() => {
    //     async function fetchOrders() {
    //       try {
    //         const response = await fetch(`http://localhost:3696/partner/getOrders?`);
    //         if (response.ok) {
    //           const data = await response.json();
    //           setOrders(data);
    //         } else {
    //           console.error('Error fetching orders:', response.statusText);
    //         }
    //       } catch (error) {
    //         console.error('Error fetching orders:', error);
    //       }
    //     }
    
    //     fetchOrders();
    //   }, []);   
    // write api for the above frontend code
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