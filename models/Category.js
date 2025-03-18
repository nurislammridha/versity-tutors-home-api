const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  img: {
    url: {
      type: String,
      require: false,
    },
    publicId: {
      type: String,
      require: false,
    }
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Category = mongoose.model("Category", CategorySchema);
