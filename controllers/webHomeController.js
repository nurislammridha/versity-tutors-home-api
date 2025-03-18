const express = require("express");
const Category = require("../models/Category");
const Client = require("../models/Client");
const SubCategory = require("../models/SubCategory");
const Area = require("../models/Area");
//@route POST api/admin
//@desc Admin login
//@access Public

//all Category
const webHome = async (req, res) => {
  let homeInfo = {}
  try {
    const totalActiveTutor = await Client.countDocuments({ isTutorAccount: true, isApproved: true });
    const totalStudent = await Client.countDocuments({ isTutorAccount: false });
    const totalSubject = await SubCategory.countDocuments();
    const totalArea = await Area.countDocuments();
    const topCat = await Category.aggregate([
      {
        $lookup: {
          from: 'subcategories', // collection name in MongoDB (always lowercase plural by default)
          localField: '_id',
          foreignField: 'categoryInfo',
          as: 'subCategories'
        }
      },
      {
        $project: {
          categoryName: 1,
          img: 1,
          subCategoryCount: { $size: '$subCategories' }
        }
      }
    ]);
    //sub catgory group
    const subCatGroup = await SubCategory.aggregate([
      {
        $lookup: {
          from: "categories", // MongoDB collection name (usually plural lowercase)
          localField: "categoryInfo",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      { $unwind: "$categoryData" },
      {
        $group: {
          _id: "$categoryData._id", // Category _id
          categoryName: { $first: "$categoryData.categoryName" },
          subCategory: {
            $push: {
              _id: "$_id", // SubCategory _id
              subCategoryName: "$subCategoryName"
            }
          }
        }
      },
      {
        $project: {
          _id: 1, // Category _id
          categoryName: 1,
          subCategory: 1
        }
      }
    ]);

    if (topCat && subCatGroup) {
      homeInfo.topCat = topCat
      homeInfo.subCatGroup = subCatGroup
      homeInfo.count = {
        totalActiveTutor, totalStudent, totalSubject, totalArea
      }
      res.status(200).json({
        result: homeInfo,
        message: "All home info showing!",
        status: true,
      });
    } else {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }

  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { webHome };
