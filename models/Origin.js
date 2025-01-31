const mongoose = require("mongoose");
const OriginSchema = new mongoose.Schema({
  originName: {
    type: String,
    require: true,
  },
  originLogo: {
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
module.exports = Origin = mongoose.model("Origin", OriginSchema);
