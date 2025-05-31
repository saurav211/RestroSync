const Table = require('./table.schema');

exports.getAllTables = async () => {
  return await Table.find();
};

exports.createTable = async (numberOfSeats) => {
  const table = new Table({ numberOfSeats });
  return await table.save();
};

exports.deleteTableById = async (id) => {
  return await Table.findByIdAndDelete(id);
};
