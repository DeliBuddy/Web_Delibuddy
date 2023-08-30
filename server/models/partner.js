const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
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
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default:null
    },
  //   contact_info: {
  //     phone: String,
  //     email: String
  //   }
  });

  const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;