const mongoose = require("mongoose");
const InstituteTypeSchema = new mongoose.Schema({
  instituteType: {
    type: String,
    required: true,
  },
  instituteTypeBn: {
    type: String,
    required: true,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = InstituteType = mongoose.model("InstituteType", InstituteTypeSchema);
