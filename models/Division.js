const mongoose = require("mongoose");
const DivisionSchema = new mongoose.Schema({
  divisionName: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Division = mongoose.model("Division", DivisionSchema);
