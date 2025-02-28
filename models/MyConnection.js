const mongoose = require("mongoose");
const MyConnectionSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    connectionPackageId: { type: mongoose.Schema.Types.ObjectId, ref: "ConnectionPackage", required: true },
    spendConnection: { type: Number, required: false },
    remainingConnection: { type: Number, required: false }
}, { timestamps: true });
module.exports = MyConnection = mongoose.model("MyConnection", MyConnectionSchema);
