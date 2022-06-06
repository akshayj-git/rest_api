const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  status: {
      type: String,
      default: '1'
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);