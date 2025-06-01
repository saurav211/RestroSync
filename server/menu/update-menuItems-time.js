// Script to update menu items with timeToPrepare
const mongoose = require('mongoose');
const MenuItem = require('./menuItem.schema');

const updates = [
  { name: 'Margherita', timeToPrepare: 10 },
  { name: 'Pepperoni', timeToPrepare: 12 },
  { name: 'Veggie Supreme', timeToPrepare: 11 },
  { name: 'Classic Burger', timeToPrepare: 8 },
  { name: 'Cheese Burger', timeToPrepare: 9 },
  { name: 'Double Patty Burger', timeToPrepare: 10 },
  { name: 'Coca-Cola', timeToPrepare: 1 },
  { name: 'Lemonade', timeToPrepare: 2 },
  { name: 'Iced Tea', timeToPrepare: 2 },
  { name: 'Classic Fries', timeToPrepare: 5 },
  { name: 'Cheese Fries', timeToPrepare: 6 },
  { name: 'Grilled Veggies', timeToPrepare: 7 },
  { name: 'Veggie Salad', timeToPrepare: 5 }
];

async function updateMenuItems() {
  await mongoose.connect('mongodb://localhost:27017/restrosync');
  for (const upd of updates) {
    await MenuItem.updateOne({ name: upd.name }, { $set: { timeToPrepare: upd.timeToPrepare } });
  }
  console.log('Menu items updated with timeToPrepare!');
  await mongoose.disconnect();
}

updateMenuItems();
