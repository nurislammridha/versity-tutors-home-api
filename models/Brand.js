const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    require: true,
  },
  brandLogo: {
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
module.exports = Brand = mongoose.model("Brand", BrandSchema);
