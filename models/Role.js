const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
    //I handle role and manager by this modal at a sam time
    name: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    whatsapp: {
        type: String,
        required: false,
    },
    avatar: {
        url: {
            type: String,
            required: false,
        },
        publicId: {
            type: String,
            required: false,
        }
    },
    roleType: {
        type: String,//Manager,Moderator
        required: false,
    },
    managerId: {
        type: String,//for modaretor
        required: false,
    },
    managerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Role'
    },

    address: {
        type: String,
        required: false,
    },
    assignServices: {
        type: Map,
        of: {
            View: { type: Boolean, default: false },
            Create: { type: Boolean, default: false },
            Edit: { type: Boolean, default: false },
            Delete: { type: Boolean, default: false },
        },
        default: {},
    },

    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
module.exports = Role = mongoose.model("Role", RoleSchema);
