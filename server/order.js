const express = require('express');
const orderRouter = express.Router();
const {Order} = require('./models/order'); // Update the path to your Order model
const Seller = require('./models/seller'); // Update the path to your Seller model
const { io } = require('socket.io-client');
const {Chat} = require('./models/chat');
// Route to add a new order



orderRouter.post('/addOrder', async (req, res) => {
  const { user, seller, items, status } = req.body;
  const io = req.app.get('io');


  try {
    //find the seller in the db
    const foundSeller = await Seller.findById(seller._id);

    const order={
      user:user,
      seller:seller,
      items:items,
      status:status
    };

    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();

    

    foundSeller.orders.push(savedOrder);
    await foundSeller.save();

   
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

      //take out the orders array from the seller
      const orders = seller.orders;

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
      //find the order in the seller's orders array

      const seller = await Seller.findById(sellerId);

      if (!seller) {
        console.log('Seller not found');
        return res.status(404).json({ error: 'Seller not found' });
      }

      //find the order in the seller's orders array and change the status to accepted and amount to the amount sent from the front end

      let index;
      for(let i=0;i<seller.orders.length;i++){
        if(seller.orders[i]._id.toString()==orderId){
          seller.orders[i].status = 'accepted';
          seller.orders[i].total_price = amount;
          index=i;
          break;
        }
      }
      // order.status = 'accepted';
      // order.amount = amount;
      await seller.save();



      // Emit an event to notify clients about the order update
      const io = req.app.get('io');
      io.to(sellerId).emit('updatedOrder', seller.orders[index]);
     
      res.status(200).json( seller.orders[index]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to accept order' });
    }
  });

  orderRouter.post('/rejectOrder', async (req, res) => {
    const { orderId, reason,sellerId } = req.body;
  
    try {
      const seller = await Seller.findById(sellerId);
      if(!seller){ 
        console.log('Seller not found');
        return res.status(404).json({ error: 'Seller not found' });
      }

  
     //delete the order from seller's orders array

     seller.orders = seller.orders.filter(order=>order._id.toString()!==orderId);

      await seller.save();

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
      const seller = await Seller.findById(order.seller._id);
      if(!seller){ 
        console.log('Seller not found');
        return res.status(404).json({ error: 'Seller not found' });
      }

  
     //delete the order from seller's orders array

     seller.orders = seller.orders.filter(order=>order._id.toString()!==order._id.toString());

      await seller.save();

      await Order.findByIdAndDelete(order._id);

      res.status(200).json({ message: 'Order deleted successfully' });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  });

  orderRouter.post('/orderDelivered', async (req, res) => {
    const {order}=req.body;
    try{
      const updatedOrder= await Order.findById(order._id);
      updatedOrder.status='delivered';
      await updatedOrder.save();

      const seller=await Seller.findById(order.seller._id);
      seller.orders=seller.orders.map(item=>{
        if(item._id.toString()===order._id.toString()){
          item.status='delivered';
        }
        return item;
      }
      );
      await seller.save();

      //deleting the chat room
      await Chat.findOneAndDelete({roomId:order._id});


      const io = req.app.get('io');
      io.to(order._id).emit('orderDelivered', updatedOrder);
      res.status(200).json(updatedOrder);
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  });

  orderRouter.post('/orderReceived', async (req, res) => {
    const {order}=req.body;
    try{
      //delete the order from Orders
      await Order.findByIdAndDelete(order._id);


      const seller=await Seller.findById(order.seller._id);
      seller.orders=seller.orders.filter(item=>item._id.toString()!==order._id.toString());
      await seller.save();



      const io = req.app.get('io');
      io.to(order.seller._id).emit('orderReceived', order._id);
      io.to(order._id).emit('orderReceived');
      res.status(200).json({ message: 'Order deleted successfully' });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  });


module.exports = orderRouter;
