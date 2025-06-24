const mongoose = require("mongoose");
const InstituteNameSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  instituteNameBn: {
    type: String,
    required: true,
    default: ""
  },
  instituteTypeId: {
    type: String,
    required: true,
  },
  instituteTypeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'InstituteType',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = InstituteName = mongoose.model("InstituteName", InstituteNameSchema);
