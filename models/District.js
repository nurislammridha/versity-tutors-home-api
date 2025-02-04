const mongoose = require("mongoose");
const DistrictSchema = new mongoose.Schema({
  districtName: {
    type: String,
    require: true,
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
module.exports = District = mongoose.model("District", DistrictSchema);
