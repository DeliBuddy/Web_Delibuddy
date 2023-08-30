const mongoose = require('mongoose');
import User from './user';
import Seller from './seller';

const orderSchema = new mongoose.Schema({
 user : {
  type:Map,
  of: User,
 },
seller:{
  type:Map,
  of:Seller
},
partner: {
  type:Map,
  of: User,
  default:null
 },
  items: [String],
  total_price: {
    type: Number,
    default:null
  },
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
