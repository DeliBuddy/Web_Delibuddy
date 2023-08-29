const express = require('express');
const orderRouter = express.Router();
const Order = require('./models/order'); // Update the path to your Order model
const Seller = require('./models/seller'); // Update the path to your Seller model
// Route to add a new order



orderRouter.post('/addOrder', async (req, res) => {
  const { user_id, seller_id, items, status } = req.body;
  const io = req.app.get('io');


  try {
    const newOrder = new Order({
      user_id,
      seller_id,
      items,
      status
    });

    const savedOrder = await newOrder.save();
    io.to(seller_id).emit('orderCreated', savedOrder);
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

orderRouter.get('/getOrders', async (req, res) => {
    const sellerName = req.query.seller; // Get the seller name from the query parameter
    try {
      const seller = await Seller.findOne({ name: sellerName });
      
      if (!seller) {
        console.log('Seller not found');
        return res.status(404).json({ error: 'Seller not found' });
      }

      const orders = await Order.find({ seller_id: sellerName});
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  orderRouter.post('/acceptOrder', async (req, res) => {
    const { orderId, amount,seller_id } = req.body;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        console.log('Order not found');
        return res.status(404).json({ error: 'Order not found' });
      }
  
     
      order.status = 'accepted';
      order.total_price = amount;
      const updatedOrder = await order.save();
      // Emit an event to notify clients about the order update
      const io = req.app.get('io');
      io.to("Mahesh").emit('updatedOrder', updatedOrder);
     
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to accept order' });
    }
  });

module.exports = orderRouter;
