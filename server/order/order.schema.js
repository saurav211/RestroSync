const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  type: {
    type: String,
    enum: ['Dine In', 'Take Away'],
    required: true
  },
  status: {
    type: String,
    enum: ['Processing', 'Done', 'Served', 'Not Picked Up'],
    default: 'Processing'
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: false
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: false
  },
  cookingInstructions: String,
  placedAt: {
    type: Date,
    default: Date.now
  },
  estimatedFinish: Date,
  timeTaken: Number // in minutes
});

module.exports = mongoose.model('Order', OrderSchema);
