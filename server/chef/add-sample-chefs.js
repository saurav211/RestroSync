// Script to add sample chefs to the database
const mongoose = require('mongoose');
const Chef = require('./chef.schema');

const chefs = [
  { name: 'Manesh Sharma' },
  { name: 'Pritam Singh' },
  { name: 'Yash Patel' },
  { name: 'Tenzen Lama' },
  { name: 'Aarav Mehta' },
  { name: 'Priya Nair' },
  { name: 'Rohan Das' },
  { name: 'Sneha Iyer' }
];

async function addChefs() {
  await mongoose.connect('mongodb+srv://sauravsingh:bjlKZHddLtihWose@cluster0.mxdvgry.mongodb.net/restrosync?retryWrites=true&w=majority&appName=Cluster0'); // Update if your DB URL is different
  await Chef.insertMany(chefs);
  console.log('Sample chefs added!');
  await mongoose.disconnect();
}

addChefs();
