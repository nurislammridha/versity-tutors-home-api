const mongoose = require("mongoose");
const ModerationHistorySchema = new mongoose.Schema({
    //I handle role and manager by this modal at a sam time
    roleId: {
        type: String,
        required: false,
    },
    roleInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
    },
    clientId: {
        type: String,
        required: false,
    },
    clientInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: false,
    },
    managerId: {
        type: String,
        required: false,
    },
    managerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
    },
    startingTime: { type: Date, default: Date.now },
    endingTime: { type: Date, required: false },
    isTaskComplete: { type: Boolean, default: false },
    isCheckedByManager: { type: Boolean, default: false },
    isTaskRejected: { type: Boolean, default: false },
    taskRejectedBy: {
        type: String,
        required: false,
        enum: ['moderator', 'manager', 'admin']//moderetor means own
    },
    lastStatus: {
        type: String,
        required: false,
        default: "underReview"
    },
    managerCheckingComment: {
        type: String,
        required: false,
    },
    statusHistory: [
        {
            status: {
                type: String,
                required: false,
            },
            comment: {
                type: String,
                required: false,
                default: ""
            },
            statusTime: { type: Date, default: Date.now }
        }
    ],
    comment: {
        type: String,
        required: false,
    },
    taskRejectedNote: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
module.exports = ModerationHistory = mongoose.model("ModerationHistory", ModerationHistorySchema);
