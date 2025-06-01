const tableService = require('./table.service');

exports.getAllTables = async (req, res) => {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const { numberOfSeats, name, booked, reserved } = req.body;
    if (!numberOfSeats) return res.status(400).json({ error: 'numberOfSeats is required' });
    const table = await tableService.createTable(numberOfSeats, name, booked, reserved);
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await tableService.deleteTableById(id);
    if (!deleted) return res.status(404).json({ error: 'Table not found' });
    res.json({ message: 'Table deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTableReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reserved } = req.body;
    const table = await tableService.updateTableReservation(id, reserved);
    if (!table) return res.status(404).json({ error: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTableName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const table = await tableService.updateTableName(id, name);
    if (!table) return res.status(404).json({ error: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
