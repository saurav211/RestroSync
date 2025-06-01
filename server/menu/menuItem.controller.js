const menuItemService = require('./menuItem.service');

exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await menuItemService.getAllMenuItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await menuItemService.getMenuItemsByCategory(category);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const item = req.body;
    const newItem = await menuItemService.createMenuItem(item);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createManyMenuItems = async (req, res) => {
  try {
    const items = req.body.items;
    const newItems = await menuItemService.createManyMenuItems(items);
    res.status(201).json(newItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
