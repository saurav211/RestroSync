// Script to add sample menu items to the database
const mongoose = require('mongoose');
const MenuItem = require('./menuItem.schema');

const items = [
  // Pizza
  { name: 'Margherita', price: 200, category: 'Pizza' },
  { name: 'Pepperoni', price: 250, category: 'Pizza' },
  { name: 'Veggie Supreme', price: 220, category: 'Pizza' },
  // Burger
  { name: 'Classic Burger', price: 120, category: 'Burger' },
  { name: 'Cheese Burger', price: 140, category: 'Burger' },
  { name: 'Double Patty Burger', price: 180, category: 'Burger' },
  // Drink
  { name: 'Coca-Cola', price: 40, category: 'Drink' },
  { name: 'Lemonade', price: 50, category: 'Drink' },
  { name: 'Iced Tea', price: 60, category: 'Drink' },
  // French Fries
  { name: 'Classic Fries', price: 80, category: 'French fries' },
  { name: 'Cheese Fries', price: 100, category: 'French fries' },
  // Veggies
  { name: 'Grilled Veggies', price: 90, category: 'Veggies' },
  { name: 'Veggie Salad', price: 110, category: 'Veggies' }
];

async function addMenuItems() {
  await mongoose.connect('mongodb://localhost:27017/restrosync');
  await MenuItem.insertMany(items);
  console.log('Sample menu items added!');
  await mongoose.disconnect();
}

addMenuItems();
