
const mongoose = require('mongoose');
const Table = require('./table.schema');
const db = require('../config/db');

async function addTables() {
  await db();
  const tables = [];
  for (let i = 1; i <= 20; i++) {
    tables.push({
      numberOfSeats: 4, 
      name: `Table ${i}`,
      booked: false,
      reserved: false
    });
  }
  await Table.insertMany(tables);
  console.log('Tables 1 to 20 added!');
  process.exit();
}

addTables().catch(err => {
  console.error(err);
  process.exit(1);
});
