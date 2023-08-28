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

module.exports = orderRouter;
