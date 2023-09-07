const mongoose = require('mongoose');
const {orderSchema} = require('./order');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  orders: [
    {
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
        type: [Map],
        default:null
      },
      status: String,
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
