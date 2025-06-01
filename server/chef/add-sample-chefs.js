// Script to add sample chefs to the database
const mongoose = require('mongoose');
const Chef = require('./chef.schema');

const chefs = [
  { name: 'Manesh' },
  { name: 'Pritam' },
  { name: 'Yash' },
  { name: 'Tenzen' },
  { name: 'Aarav' },
  { name: 'Priya' },
  { name: 'Rohan' },
  { name: 'Sneha' }
];

async function addChefs() {
  await mongoose.connect('mongodb://localhost:27017/restrosync'); // Update if your DB URL is different
  await Chef.insertMany(chefs);
  console.log('Sample chefs added!');
  await mongoose.disconnect();
}

addChefs();
