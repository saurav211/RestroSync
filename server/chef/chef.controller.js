const Chef = require('./chef.schema');

// Get all chefs
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new chef
exports.addChef = async (req, res) => {
  try {
    const { name } = req.body;
    const chef = new Chef({ name });
    await chef.save();
    res.status(201).json(chef);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update chef's order count
exports.updateChefOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { ordersProcessing } = req.body;
    const chef = await Chef.findByIdAndUpdate(id, { ordersProcessing }, { new: true });
    if (!chef) return res.status(404).json({ error: 'Chef not found' });
    res.json(chef);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
