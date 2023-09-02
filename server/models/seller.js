const mongoose = require('mongoose');
const {orderSchema} = require('./order');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  orders: [{
    orderSchema
  }],
//   contact_info: {
//     phone: String,
//     email: String
//   }
type:{
  type: String,
  default: "seller",
},
});



const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
