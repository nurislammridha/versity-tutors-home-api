const mongoose = require("mongoose");
const StudyTypeSchema = new mongoose.Schema({
  studyType: {
    type: String,
    required: true,
  },
  studyTypeBn: {
    type: String,
    required: true,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // ✅ This adds createdAt and updatedAt
});
module.exports = StudyType = mongoose.model("StudyType", StudyTypeSchema);
