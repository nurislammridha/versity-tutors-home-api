const mongoose = require("mongoose");
const ConnectionPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameBn: {
    type: String,
    required: true,
    default: ""
  },
  connections: {
    type: Number,
    required: true,
  },
  connectionsBn: {
    type: String,
    required: true,
    default: ""
  },
  price: {
    type: Number,
    required: true,
  },
  priceBn: {
    type: String,
    required: true,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });
module.exports = ConnectionPackage = mongoose.model("ConnectionPackage", ConnectionPackageSchema);
