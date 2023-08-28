const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
//   shop_location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
//   contact_info: {
//     phone: String,
//     email: String
//   }
});



const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
