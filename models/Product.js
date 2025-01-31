const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discountPrice: {
    type: Number,
    require: true,
  },
  productNameBangla: {
    type: String,
    require: false,
    default: ""
  },
  productIcon: {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    }
  },
  productImages: [
    {
      url: {
        type: String,
        require: true,
      },
      publicId: {
        type: String,
        require: true,
      }
    }
  ],
  categoryId: {
    type: String,
    require: true,
  },
  categoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'Category'
  },
  subCategoryId: {
    type: String,
    require: true,
  },
  subCategoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'SubCategory'
  },
  subSubCategoryId: {
    type: String,
    require: true,
  },
  subSubCategoryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'SubSubCategory'
  },
  brandId: {
    type: String,
    require: true,
  },
  brandInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'Brand'
  },
  relatedProducts: [{
    label: {
      type: String,
      require: true,
    },
    value: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isAvailableCashOnDelivery: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isFlashSell: {
    type: Boolean,
    default: false,
  },
  isTodayDeal: {
    type: Boolean,
    default: false,
  },
  variantProducts: [{
    variantImg: {
      url: {
        type: String,
        require: true,
      },
      publicId: {
        type: String,
        require: true,
      }
    },
    stock: {
      type: Number,
      require: true,
    },
    minStock: {
      type: Number,
      require: true,
    },
    variantName: {
      type: String,
      require: true,
    },
    variantId: {
      type: Number,
      require: true,
    },
    unitId: {
      type: String,
      require: true,
    },
    unitName: {
      type: String,
      require: true,
    },
    unitInfo: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'Unit'
    },
    colorId: {
      type: String,
      require: true,
    },
    colorName: {
      type: String,
      require: true,
    },
    colorHexCode: {
      type: String,
      require: true,
    },
    colorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'Color'
    },
    originId: {
      type: String,
      require: true,
    },
    originName: {
      type: String,
      require: true,
    },
    originLogo: {
      url: {
        type: String,
        require: true,
      },
      publicId: {
        type: String,
        require: true,
      }
    },
    originInfo: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'Origin'
    },
    note: {
      type: String,
      require: true
    },

    multipleProducts: [
      {
        minQuantity: {
          type: Number,
          require: true
        },
        maxQuantity: {
          type: Number,
          require: true
        },
        price: {
          type: Number,
          require: true
        },
        discountPrice: {
          type: Number,
          require: true
        },
        startDate: {
          type: String,
          require: true
        },
        endDate: {
          type: String,
          require: true
        }
      }
    ]
  }],
  length: { type: String, require: false },
  width: { type: String, require: false },
  height: { type: String, require: false },
  weight: { type: String, require: false },
  shortDescriptions: { type: String, require: false },
  shortDescriptionsBangla: { type: String, require: false },
  longDescriptions: { type: String, require: false },
  longDescriptionsBangla: { type: String, require: false },
  seoTag: { type: String, require: false },
  warrantyPolicy: { type: String, require: false },
  warrantyStartDate: { type: String, require: false },
  warrantyEndDate: { type: String, require: false },
  model: { type: String, require: false },
  sold: { type: Number, require: false, default: 0 },
  videoUrl: [{
    type: String,
    require: false,
    default: ""
  }],
  viewCount: {
    type: Number,
    default: 0,
  },
  productReview: [
    {
      buyerId: { type: String, require: false },
      buyerInfo: { type: mongoose.Schema.Types.ObjectId, require: false, ref: 'Buyer' },
      review: { type: String, require: false },
      star: { type: Number, require: false },
      date: { type: String, require: false },
      time: { type: String, require: false },
    }
  ],
  questionAndAnswer: [
    {
      buyerId: { type: String, require: false },
      buyerInfo: { type: mongoose.Schema.Types.ObjectId, require: false, ref: 'Buyer' },
      question: { type: String, require: false },
      answer: { type: String, require: false },
      date: { type: String, require: false },
      time: { type: String, require: false },
    }
  ]
});
module.exports = Product = mongoose.model("Product", ProductSchema);
