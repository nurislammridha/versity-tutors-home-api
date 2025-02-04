const mongoose = require("mongoose");
const LanguageSchema = new mongoose.Schema({
  languageName: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Language = mongoose.model("Language", LanguageSchema);
