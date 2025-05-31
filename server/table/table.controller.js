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
    const { numberOfSeats } = req.body;
    if (!numberOfSeats) return res.status(400).json({ error: 'numberOfSeats is required' });
    const table = await tableService.createTable(numberOfSeats);
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
