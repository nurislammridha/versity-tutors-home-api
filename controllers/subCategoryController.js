const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");
//@route POST api/admin
//@desc Admin login
//@access Public
const createSubCategory = async (req, res) => {
  const { categoryName, categoryId, categoryInfo, subCategoryName, subCategoryNameBn, subCategoryImg } = req.body;
  try {
    // let catName = await SubCategory.findOne({ subCategoryName });
    // //see if user exists
    // if (catName) {
    //   return res.status(400).json({ message: "Sub Category already exist" });
    // }
    let subCategory = new SubCategory({ categoryName, categoryId, categoryInfo, subCategoryName, subCategoryNameBn, subCategoryImg });
    await subCategory.save();
    res.status(200).json({
      message: "Subject inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub Category
const allSubCategories = async (req, res) => {
  try {
    await SubCategory.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All subject are showing!",
          status: true,
        });
      }
    }).populate('categoryInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//all Sub Category filter
const allSubCategoriesFilter = async (req, res) => {
  try {
    const { search = null, filters = null, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    // Search by multiple fields
    if (search && search.length > 0) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { subCategoryName: regex },
        { "categoryInfo.categoryName": regex }
      ];
    }
    if (filters && filters.length > 0) {
      query.categoryId = filters;
    }
    const total = await SubCategory.countDocuments(query);
    const subCat = await SubCategory.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('categoryInfo')

    res.status(200).json({
      result: subCat,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Sub Cat retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};

//Sub Category By ID//
const subCategoryById = async (req, res) => {
  await SubCategory.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Subject By Id!",
        status: true,
      });
    }
  }).populate("categoryInfo");
};
//Sub Category By Category ID//
const subCategoryByCategory = async (req, res) => {
  await SubCategory.find({ categoryId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Subject By Category Id!",
        status: true,
      });
    }
  }).populate('categoryInfo');
};

//Update Sub cateCategory
const updateSubCategory = async (req, res) => {
  await SubCategory.updateOne(
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
          message: "Subject were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub category
const deleteSubCategory = async (req, res) => {
  await SubCategory.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Subject was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createSubCategory, allSubCategories, subCategoryById, subCategoryByCategory, updateSubCategory, deleteSubCategory, allSubCategoriesFilter };
