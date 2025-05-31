const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  numberOfSeats: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);