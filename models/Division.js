const mongoose = require("mongoose");
const DivisionSchema = new mongoose.Schema({
  divisionName: {
    type: String,
    required: true,
  },
  divisionNameBn: {
    type: String,
    required: true,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Division = mongoose.model("Division", DivisionSchema);
