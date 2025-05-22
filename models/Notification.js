const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: false,
  },
  clientInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Client'
  },
  roleId: {
    type: String,
    required: false,
    ref: 'Role'
  },
  roleInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Role'
  },
  isSeen: {//click at single and seen details
    type: Boolean,
    default: false,
  },
  isClicked: {
    type: Boolean,
    default: false,
  },
  clickIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  }],
  seenIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isClicked: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });
module.exports = Notification = mongoose.model("Notification", NotificationSchema);
