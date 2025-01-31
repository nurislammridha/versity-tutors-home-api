const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Campaign = require("../models/Campaign");
//@route POST api/admin
//@desc Admin login
//@access Public

const createProduct = async (req, res) => {
  // const { productName } = req.body;
  try {

    let product = new Product(req.body);
    await product.save();
    res.status(200).json({
      message: "Product inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Products ;ist
const allProducts = async (req, res) => {
  try {
    const search = req.query.search || ""
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const searchRegExp = new RegExp('.*' + search + '.*', 'i')
    const filter = {
      $or: [
        { productName: { $regex: searchRegExp } },
        { categoryName: { $regex: searchRegExp } },
        { brandName: { $regex: searchRegExp } },
        { sellerName: { $regex: searchRegExp } }
      ]
    }
    const products = await Product.find(filter).sort({ _id: -1 }).limit(limit).skip((page - 1) * limit)
      .populate('sellerInfo')
      .populate('brandInfo')
      .populate('categoryInfo')
      .populate('subCategoryInfo')
      .populate('subSubCategoryInfo')
    const count = await Product.find(filter).countDocuments()

    if (!products) {
      res.status(200).json({
        result: [],
        message: "No data found",
        status: true,
      });
    }

    res.status(200).json({
      result: {
        products,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          count: count
        }
      },
      message: "All products list are showing!",
      status: true,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
//all Products by filter shop and categories
const allProductsByShopsAndCategories = async (req, res) => {
  //short low to high 1// high to low -1
  const { campaignId = "", categoriesId, subCategoryId = "", sellersId = [], brandsId, isShortBy, short, search = "", page: pageNumber, limit: limitNumber } = req.body || {}
  // console.log('req.body', req.body)
  // const filteredProducts= productModel.find({ categories:{$in:categories}  })
  //  isShortBy === true then sort 0, low to high -1, high to low 1
  const page = Number(pageNumber) || 1
  const limit = Number(limitNumber) || 5
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  let filter = {}
  if (campaignId.length > 0) {
    console.log('campaignId', campaignId)
    filter = {
      $and: [
        { campaignId },
        {
          $or: [
            { productName: { $regex: searchRegExp } },
            { categoryName: { $regex: searchRegExp } },
            { brandName: { $regex: searchRegExp } },
            { sellerName: { $regex: searchRegExp } },
            // { categoryId: { $in: categoriesId } },
            // { sellerId: { $in: sellersId } }
          ]
        }
      ]
    }
  } else {
    if (subCategoryId.length > 0) {
      filter = {
        $and: [
          { subCategoryId },
          {
            $or: [
              { productName: { $regex: searchRegExp } },
              { categoryName: { $regex: searchRegExp } },
              { brandName: { $regex: searchRegExp } },
              { sellerName: { $regex: searchRegExp } },
              // { categoryId: { $in: categoriesId } },
              // { sellerId: { $in: sellersId } }
            ]
          }
        ]
      }
    } else {
      filter = {
        $or: [
          { productName: { $regex: searchRegExp } },
          { categoryName: { $regex: searchRegExp } },
          { brandName: { $regex: searchRegExp } },
          { sellerName: { $regex: searchRegExp } },
          // { categoryId: { $in: categoriesId } },
          // { sellerId: { $in: sellersId } }
        ]
      }
    }
  }

  let sortObj = {}
  if (isShortBy) {
    sortObj = { mrp: short }
  } else {
    sortObj = { _id: -1 }
  }
  try {
    let pro = []
    let count = 0
    if (sellersId.length > 0) {
      // shop wise filter
      if (categoriesId.length > 0 && brandsId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).countDocuments()
      } else if (brandsId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length === 0 && brandsId.length === 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).populate('sellerInfo').countDocuments()
      }

    } else {
      //not shop page
      if (categoriesId.length > 0 && brandsId.length > 0) {
        pro = await Product.find(filter).where("categoryId").in(categoriesId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("categoryId").in(categoriesId).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length > 0) {
        pro = await Product.find(filter).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("categoryId").in(categoriesId).countDocuments()
      } else if (brandsId.length > 0) {
        pro = await Product.find(filter).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length === 0 && brandsId.length === 0) {
        pro = await Product.find(filter).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).populate('sellerInfo').countDocuments()
      }
    }

    // pro = await Product.find(filter).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj)
    // console.log('pro', pro)
    if (pro) {
      res.status(200).json({
        result: {
          products: pro,
          pagination: {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            count: count
          }
        },
        message: "All products filter list are showing!",
        status: true,
      });
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};
const allProductsBySearchAndFilter = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      subSubCategoryId,
      brandId,
      minPrice,
      maxPrice,
      sortBy,
      isTrending = false,
      isTodayDeal = false,
      isPopular = false,
      search // New: Search by product name
    } = req.query;

    let filter = {};

    // Apply filters if provided
    if (categoryId) filter.categoryId = categoryId;
    if (subCategoryId) filter.subCategoryId = subCategoryId;
    if (subSubCategoryId) filter.subSubCategoryId = subSubCategoryId;
    if (brandId) filter.brandId = brandId;

    // Case-insensitive product name search
    if (search) {
      filter.productName = { $regex: search, $options: "i" }; // Case-insensitive regex match
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.discountPrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.discountPrice.$lte = parseFloat(maxPrice);
    }

    // Trading product filter
    if (isTrending) filter.isTrending = isTrending;

    // Popular product filter
    if (isPopular) filter.isPopular = isPopular;

    // isTodayDeal product filter
    if (isTodayDeal) filter.isTodayDeal = isTodayDeal;

    // Sorting
    let sortOptions = {};
    sortOptions._id = -1
    if (sortBy === "price_low_high") sortOptions.discountPrice = 1;
    if (sortBy === "price_high_low") sortOptions.discountPrice = -1;
    if (isPopular) sortOptions.viewCount = -1;

    const products = await Product.find(filter).sort(sortOptions);

    res.status(200).json({
      result: products,
      message: "All products list are showing!",
      status: true,
    })
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}
const camProduct = async (list) => {
  let data = []
  await list.forEach(e => {
    // console.log('e._id', e._id)
    data = Product.find({ campaignId: e._id }).limit(20)
    // console.log('products', products)
    // let obj = { ...e._doc, products }
    // data.push(products)
    console.log('data', data._doc)
  });
  return data
}
const homepageProducts = async (req, res) => {
  try {
    // let sellKonMallProducts = await Product.find({ sellerId: "6602d7dfdf403e1264fffccc" }).sort({ _id: -1 });
    let trendingProducts = await Product.find({ isTrending: true }).sort({ _id: -1 });
    let flashProducts = await Product.find({ isFlashSell: true }).sort({ _id: -1 });
    // let newArrival = await Product.find().sort({ _id: -1 }).limit(15);
    let popularProducts = await Product.find().sort({ viewCount: -1 }).limit(15);
    // let shopsList = await Seller.find().sort({ _id: -1 });
    let categories = await Category.find().sort({ _id: -1 });
    const catWiseProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ categoryId: category._id });
        return { category: category.categoryName, categoryId: category._id, products };
      })
    );
    // let subCategoriesList = await SubCategory.find();
    // let cam = await Campaign.find({ isShowHomePage: true });
    // let campaign = await Product.find({ campaignId: "6642d16d4f1f26396015ff5b", isCampaign: true }).populate('campaign').limit(20);
    // let eidCampaign = await Product.find({ campaignId: "66706ae51363cf04677a4e06", isCampaign: true }).populate('campaign').limit(20);
    // let campaign = camProduct(cam)
    await Product.find((err, newArrival) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: { newArrival, trendingProducts, popularProducts, catWiseProducts, flashProducts },
          message: "All products list are showing!",
          status: true,
        });
      }
    }).sort({ _id: -1 }).limit(15);

    // await Product.find((err, data) => {
    //   if (err) {
    //     res.status(500).json({
    //       error: "There was a server side error!",
    //     });
    //   } else {
    //     res.status(200).json({
    //       result: data,
    //       message: "All products list are showing!",
    //       status: true,
    //     });
    //   }
    // });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Product By ID//
const productById = async (req, res) => {
  const productId = req.params.id
  await Product.find({ _id: productId }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      let count = obj?.viewCount
      // console.log('count', count)
      Product.updateOne({ _id: productId }, { $set: { viewCount: ++count } }, (err, data) => {
        // console.log('err', err)
        // console.log('data', data)
      })
      res.status(200).json({
        result: obj,
        message: "Product By Id!",
        status: true,
      });
    }
  }).populate('relatedProducts.value')
    .populate('sellerInfo')
    .populate('brandInfo')
    .populate('categoryInfo')
    .populate('subCategoryInfo')
    .populate('subSubCategoryInfo')
    ;
};
// Product By subCategory id ID//
const productBySubcategory = async (req, res) => {
  await Product.find({ subCategoryId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Product By Subcategory Id!",
        status: true,
      });
    }
  });
};

//Update Product
const updateProduct = async (req, res) => {
  await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Product were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete Product
const deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Product was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createProduct, allProducts, productById, productBySubcategory, allProductsByShopsAndCategories, updateProduct, deleteProduct, homepageProducts, allProductsBySearchAndFilter };
