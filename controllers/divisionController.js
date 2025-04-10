const express = require("express");
const router = express.Router();
const Division = require("../models/Division");
//@route POST api/admin
//@desc Admin login
//@access Public
const createDivision = async (req, res) => {
  const { divisionName } = req.body;
  try {
    let divName = await Division.findOne({ divisionName });
    //see if user exists
    if (divName) {
      return res.status(400).json({ message: "Division already exist" });
    }
    let division = new Division(req.body);
    await division.save();
    res.status(200).json({
      message: "Division inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Division
const allDivisions = async (req, res) => {
  try {
    await Division.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Division are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Division By ID//
const divisionById = async (req, res) => {
  await Division.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Division was inserted successfully!",
        status: true,
      });
    }
  });
};

//Update Division
const updateDivision = async (req, res) => {
  await Division.updateOne(
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
          message: "Division were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete Division
const deleteDivision = async (req, res) => {
  await Division.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Division was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createDivision, allDivisions, divisionById, updateDivision, deleteDivision };
