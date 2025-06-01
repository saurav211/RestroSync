const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  timeToPrepare: { type: Number, required: true }, // in minutes
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
