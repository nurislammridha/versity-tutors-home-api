const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Category = mongoose.model("Category", CategorySchema);
