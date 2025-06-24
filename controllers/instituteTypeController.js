const express = require("express");
const router = express.Router();
const InstituteType = require("../models/InstituteType");
//@route POST api/admin
//@desc Admin login
//@access Public
const createInstituteType = async (req, res) => {
  const { instituteType: ins } = req.body;
  console.log('ins', ins)
  try {
    let isExist = await InstituteType.findOne({ instituteType: ins });
    //see if user exists
    if (isExist) {
      return res.status(400).json({ message: "Institute type already exist" });
    }
    let institute = new InstituteType(req.body);
    await institute.save();
    res.status(200).json({
      message: "Institute type inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all InstituteType
const allInstituteTypes = async (req, res) => {
  try {
    await InstituteType.find((err, data) => {
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
// controllers/institutetypeController.js

const allInstituteTypesFilter = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      instituteType: { $regex: search, $options: "i" }, // case-insensitive search
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await InstituteType.countDocuments(query);
    const categories = await InstituteType.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      result: categories,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Institute type retrieved successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// InstituteType By ID//
const instituteTypeById = async (req, res) => {
  await InstituteType.find({ _id: req.params.id }, (err, data) => {
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

//Update InstituteType
const updateInstituteType = async (req, res) => {
  await InstituteType.updateOne(
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

//delete institutetype
const deleteInstituteType = async (req, res) => {
  await InstituteType.deleteOne({ _id: req.params.id }, (err) => {
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
module.exports = { createInstituteType, allInstituteTypes, instituteTypeById, updateInstituteType, deleteInstituteType, allInstituteTypesFilter };
