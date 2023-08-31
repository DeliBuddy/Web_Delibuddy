const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
 user : {
  type:Map,
 },
seller:{
  type:Map,
},
partner: {
  type:Map,
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
