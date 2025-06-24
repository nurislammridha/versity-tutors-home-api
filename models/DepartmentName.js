const mongoose = require("mongoose");
const DepartmentNameSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentNameBn: {
    type: String,
    required: true,
    default: ""
  },
  studyTypeId: {
    type: String,
    required: true,
  },
  studyTypeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'StudyType',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = DepartmentName = mongoose.model("DepartmentName", DepartmentNameSchema);
