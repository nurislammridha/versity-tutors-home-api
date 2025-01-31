const express = require("express");
const router = express.Router();
const SubSubCategory = require("../models/SubSubCategory");
//@route POST api/admin
//@desc Admin login
//@access Public
const createSubSubCategory = async (req, res) => {
  const { categoryId, categoryInfo, subCategoryId, subCategoryInfo, subSubCategoryName, subSubCategoryImg } = req.body;
  try {

    let subSubCategory = new SubSubCategory({ categoryId, categoryInfo, subCategoryId, subCategoryInfo, subSubCategoryName, subSubCategoryImg });
    await subSubCategory.save();
    res.status(200).json({
      message: "Sub Sub Category inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub Category
const allSubSubCategories = async (req, res) => {
  try {
    await SubSubCategory.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All sub category are showing!",
          status: true,
        });
      }
    }).populate('categoryInfo').populate('subCategoryInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//Sub Category By ID//
const subSubCategoryById = async (req, res) => {
  await SubSubCategory.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Sub Category By Id!",
        status: true,
      });
    }
  }).populate("categoryInfo").populate('subCategoryInfo');
};
//Sub Category By Category ID//
const subSubCategoryBySubCategory = async (req, res) => {
  await SubSubCategory.find({ subCategoryId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Sub Sub Category By Sub Category Id!",
        status: true,
      });
    }
  }).populate('categoryInfo').populate('subCategoryInfo');
};

//Update Sub Sub cateCategory
const updateSubSubCategory = async (req, res) => {
  await SubSubCategory.updateOne(
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
          message: "Sub Sub category were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub sub category
const deleteSubSubCategory = async (req, res) => {
  await SubSubCategory.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Sub Sub Category was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createSubSubCategory, allSubSubCategories, subSubCategoryById, subSubCategoryBySubCategory, updateSubSubCategory, deleteSubSubCategory };
