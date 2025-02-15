const mongoose = require("mongoose");
const AreaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    require: true,
  },
  subDistrictId: {
    type: String,
    require: true,
  },
  subDistrictInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'SubDistrict'
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
module.exports = Area = mongoose.model("Area", AreaSchema);
