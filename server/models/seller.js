const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
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
