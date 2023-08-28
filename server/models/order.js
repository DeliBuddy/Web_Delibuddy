const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type:String,
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  seller_id: {
    type:String,
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  partner_id: {
    type:String,
    default:null,
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
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
