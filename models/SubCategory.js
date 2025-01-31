const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: String,
    require: true,
  },
  categoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Category'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
