const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // Who is receiving the comment
    commenterId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // Who wrote the comment
    comment: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5, required: true }, // 1 to 5 star rating
}, { timestamps: true });
module.exports = Review = mongoose.model("Review", ReviewSchema);
