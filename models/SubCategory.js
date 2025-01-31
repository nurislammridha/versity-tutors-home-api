const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    require: true,
  },
  categoryImgUrl: {
    type: String,
    require: true,
  },
  categoryName: {
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
  subCategoryImg: {
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
module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
