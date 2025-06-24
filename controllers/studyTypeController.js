const express = require("express");
const router = express.Router();
const StudyType = require("../models/StudyType");
//@route POST api/admin
//@desc Admin login
//@access Public
const createStudyType = async (req, res) => {
  const { studyType: ins } = req.body;
  console.log('ins', ins)
  try {
    let isExist = await StudyType.findOne({ studyType: ins });
    //see if user exists
    if (isExist) {
      return res.status(400).json({ message: "Study type already exist" });
    }
    let study = new StudyType(req.body);
    await study.save();
    res.status(200).json({
      message: "Study type inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all StudyType
const allStudyTypes = async (req, res) => {
  try {
    await StudyType.find((err, data) => {
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
// controllers/studytypeController.js

const allStudyTypesFilter = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      studyType: { $regex: search, $options: "i" }, // case-insensitive search
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await StudyType.countDocuments(query);
    const categories = await StudyType.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      result: categories,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Study type retrieved successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// StudyType By ID//
const studyTypeById = async (req, res) => {
  await StudyType.find({ _id: req.params.id }, (err, data) => {
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

//Update StudyType
const updateStudyType = async (req, res) => {
  await StudyType.updateOne(
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

//delete studytype
const deleteStudyType = async (req, res) => {
  await StudyType.deleteOne({ _id: req.params.id }, (err) => {
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
module.exports = { createStudyType, allStudyTypes, studyTypeById, updateStudyType, deleteStudyType, allStudyTypesFilter };
