const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({
  colorName: {
    type: String,
    require: true,
  },
  colorHexCode: {
    type: String,
    require: false,
    default: ""
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Color = mongoose.model("Color", ColorSchema);
