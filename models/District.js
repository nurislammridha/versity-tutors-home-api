const mongoose = require("mongoose");
const DistrictSchema = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
  },
  districtNameBn: {
    type: String,
    required: true,
    default: ""
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
module.exports = District = mongoose.model("District", DistrictSchema);
