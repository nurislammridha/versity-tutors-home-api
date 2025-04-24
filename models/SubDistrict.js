const mongoose = require("mongoose");
const SubDistrictSchema = new mongoose.Schema({
  subDistrictName: {
    type: String,
    required: true,
  },
  subDistrictNameBn: {
    type: String,
    required: true,
    default: ""
  },
  districtId: {
    type: String,
    required: true,
  },
  districtInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'District'
  },
  divisionId: {
    type: String,
    required: true,
  },
  divisionInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Division'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = SubDistrict = mongoose.model("SubDistrict", SubDistrictSchema);
