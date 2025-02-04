const mongoose = require("mongoose");
const ConnectionPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  connections: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });
module.exports = ConnectionPackage = mongoose.model("ConnectionPackage", ConnectionPackageSchema);
