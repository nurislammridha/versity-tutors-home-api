const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  subCategoryNameBn: {
    type: String,
    required: true,
    default: ""
  },
  categoryId: {
    type: String,
    required: true,
  },
  categoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
