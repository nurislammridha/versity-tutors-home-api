const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client", required: true
    },
    title: {
        type: String,
        required: true
    },
    doc: {
        url: {
            type: String,
            required: false,
        },
        publicId: {
            type: String,
            required: false,
        }
    },
}, { timestamps: true });
module.exports = Document = mongoose.model("Document", DocumentSchema);
