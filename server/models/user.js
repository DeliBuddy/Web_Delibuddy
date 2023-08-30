const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default:null
  },
  type:{
    type: String,
    default: "user",
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
