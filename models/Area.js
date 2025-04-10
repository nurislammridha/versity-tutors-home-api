const mongoose = require("mongoose");
const AreaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
  },
  areaNameBn: {
    type: String,
    required: true,
    default: ""
  },
  subDistrictId: {
    type: String,
    required: true,
  },
  subDistrictInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubDistrict'
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
});
module.exports = Area = mongoose.model("Area", AreaSchema);
