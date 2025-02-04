const express = require("express");
const router = express.Router();
const District = require("../models/District");
//@route POST api/admin
//@desc Admin login
//@access Public
const createDistrict = async (req, res) => {
  const { districtName } = req.body;
  try {
    let disName = await District.findOne({ districtName });
    //see if user exists
    if (disName) {
      return res.status(400).json({ message: "District already exist" });
    }
    let district = new District(req.body);
    await district.save();
    res.status(200).json({
      message: "District inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all District
const allDistricts = async (req, res) => {
  try {
    await District.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All district are showing!",
          status: true,
        });
      }
    }).populate('divisionInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//District By ID//
const districtById = async (req, res) => {
  await District.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "District By Id!",
        status: true,
      });
    }
  }).populate("categoryInfo");
};
//District By Division ID//
const districtByDivision = async (req, res) => {
  await District.find({ divisionId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "District By Division Id!",
        status: true,
      });
    }
  }).populate('divisionInfo');
};

//Update district
const updateDistrict = async (req, res) => {
  await District.updateOne(
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
          message: "District were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete district
const deleteDistrict = async (req, res) => {
  await District.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "District was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createDistrict, allDistricts, districtById, districtByDivision, updateDistrict, deleteDistrict };
