const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // Who is receiving the comment
    bookerId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // Who wrote the comment
    status: { type: String, required: true } //initiate //accepted //rejected
}, { timestamps: true });
module.exports = Book = mongoose.model("Book", BookSchema);
