const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please Add User Name'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },

});
module.exports = Admin = mongoose.model("Admin", AdminSchema);
