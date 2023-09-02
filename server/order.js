const express = require('express');
const orderRouter = express.Router();
const {Order} = require('./models/order'); // Update the path to your Order model
const Seller = require('./models/seller'); // Update the path to your Seller model
// Route to add a new order



orderRouter.post('/addOrder', async (req, res) => {
  const { user, seller, items, status } = req.body;
  const io = req.app.get('io');


  try {
    const newOrder = new Order({
      user,
      seller,
      items,
      status
    });

    const savedOrder = await newOrder.save();
    io.to(seller._id).emit('orderCreated', savedOrder);
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

orderRouter.get('/getOrders', async (req, res) => {
    const sellerId = req.query.seller; // Get the seller name from the query parameter
    try {
      const seller = await Seller.findById(sellerId);
      
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }

      const orders = await Order.find({ 'seller._id': sellerId });

      const pendingForwardedOrders = orders.filter(order=>order.status==='forwarded' || order.status==='pending');
      
      res.status(200).json(pendingForwardedOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  orderRouter.post('/acceptOrder', async (req, res) => {
    const { orderId, amount,sellerId } = req.body;
  
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
      io.to(sellerId).emit('updatedOrder', updatedOrder);
     
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to accept order' });
    }
  });

  orderRouter.post('/rejectOrder', async (req, res) => {
    const { orderId, reason,sellerId } = req.body;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        console.log('Order not found');
        return res.status(404).json({ error: 'Order not found' });
      }
  
     //delete the order from db


     await Order.findByIdAndDelete(orderId);

      // Emit an event to notify clients about the order update
      const io = req.app.get('io');
      io.to(sellerId).emit('rejectedOrder', reason);
     
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to accept order' });
    }
  });

  //write api for the above front end code
  orderRouter.post('/cancelOrder', async (req, res) => {
    const { order } = req.body;
    try{
      const temp = await Order.findById(order._id);
      if (!temp) {
        console.log('Order not found');
        return res.status(404).json({ error: 'Order not found' });
      }
  
     //delete the order from db
     
      await Order.findByIdAndDelete(order._id);

      res.status(200).json({ message: 'Order deleted successfully' });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  });

module.exports = orderRouter;
