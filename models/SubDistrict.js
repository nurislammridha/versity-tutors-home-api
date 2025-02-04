const mongoose = require("mongoose");
const SubDistrictSchema = new mongoose.Schema({
  subDistrictName: {
    type: String,
    require: true,
  },
  districtId: {
    type: String,
    require: true,
  },
  districtInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'District'
  },
  divisionId: {
    type: String,
    require: true,
  },
  divisionInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Division'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = SubDistrict = mongoose.model("SubDistrict", SubDistrictSchema);
