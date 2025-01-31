const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    require: true,
  },
  buyerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Buyer'
  },
  productInfo: [{
    productDetails: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product"
    },
    productId: {
      type: String,
      unique: true,
      require: true
    },
    variantId: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    },
    // colorName: {
    //   type: String,
    //   require: false,
    // },
    // colorHexCode: {
    //   type: String,
    //   require: false,
    // },
    // sizeName: {
    //   type: String,
    //   require: false,
    // },
    productImgUrl: {
      type: String,
      require: false,
    },
    // campaignId: {
    //   type: String,
    //   require: false,
    // },
    // campaignEndTime: {
    //   type: String,
    //   require: false,
    // },
    // campaignEndDate: {
    //   type: String,
    //   require: false,
    // },
    // campaignPrice: {
    //   type: Number,
    //   require: false,
    // },
  }],
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Cart = mongoose.model("Cart", CartSchema);
