const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryNameBn: {
    type: String,
    required: true,
    default: ""
  },
  img: {
    url: {
      type: String,
      required: false,
    },
    publicId: {
      type: String,
      required: false,
    }
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = Category = mongoose.model("Category", CategorySchema);
