const mongoose = require("mongoose");
const SubSubCategorySchema = new mongoose.Schema({
  subSubCategoryName: {
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
  subCategoryId: {
    type: String,
    require: true,
  },
  subCategoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'SubCategory'
  },
  subSubCategoryImg: {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    }
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);
