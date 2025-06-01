const Table = require('./table.schema');

exports.getAllTables = async () => {
  return await Table.find();
};

exports.createTable = async (numberOfSeats, name = null, booked = false, reserved = false) => {
  const table = new Table({ numberOfSeats, name, booked, reserved });
  return await table.save();
};

exports.deleteTableById = async (id) => {
  return await Table.findByIdAndDelete(id);
};

exports.updateTableReservation = async (id, reserved) => {
  return await Table.findByIdAndUpdate(id, { reserved }, { new: true });
};

exports.updateTableName = async (id, name) => {
  return await Table.findByIdAndUpdate(id, { name }, { new: true });
};
