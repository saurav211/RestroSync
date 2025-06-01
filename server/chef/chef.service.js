const Chef = require('./chef.schema');

exports.getChefs = async () => {
  return await Chef.find();
};

exports.addChef = async (name) => {
  const chef = new Chef({ name });
  return await chef.save();
};

exports.updateChefOrders = async (id, ordersProcessing) => {
  return await Chef.findByIdAndUpdate(id, { ordersProcessing }, { new: true });
};
