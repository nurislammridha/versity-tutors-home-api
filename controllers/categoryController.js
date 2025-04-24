const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
//@route POST api/admin
//@desc Admin login
//@access Public
const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    let catName = await Category.findOne({ categoryName });
    //see if user exists
    if (catName) {
      return res.status(400).json({ message: "Class already exist" });
    }
    let category = new Category(req.body);
    await category.save();
    res.status(200).json({
      message: "Class inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Category
const allCategories = async (req, res) => {
  try {
    await Category.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All class are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
// controllers/categoryController.js

const allCategoriesFilter = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      categoryName: { $regex: search, $options: "i" }, // case-insensitive search
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      result: categories,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Categories retrieved successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// Category By ID//
const categoryById = async (req, res) => {
  await Category.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Class was inserted successfully!",
        status: true,
      });
    }
  });
};

//Update Category
const updateCategory = async (req, res) => {
  await Category.updateOne(
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
          message: "Class were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete category
const deleteCategory = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Class was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createCategory, allCategories, categoryById, updateCategory, deleteCategory, allCategoriesFilter };
