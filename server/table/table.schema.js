const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  numberOfSeats: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false
  },
  reserved: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    trim: true,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);