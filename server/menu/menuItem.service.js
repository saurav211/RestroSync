const MenuItem = require('./menuItem.schema');

exports.getAllMenuItems = async () => {
  return await MenuItem.find();
};

exports.getMenuItemsByCategory = async (category) => {
  return await MenuItem.find({ category });
};

exports.createMenuItem = async (item) => {
  const menuItem = new MenuItem(item);
  return await menuItem.save();
};

exports.createManyMenuItems = async (items) => {
  return await MenuItem.insertMany(items);
};
