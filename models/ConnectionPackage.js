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
