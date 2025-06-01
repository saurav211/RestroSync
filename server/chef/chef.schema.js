const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ordersProcessing: {
    type: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        estimatedFinish: { type: Date, required: true }
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chef', ChefSchema);
