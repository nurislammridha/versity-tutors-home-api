const express = require("express");
const router = express.Router();
const ConnectionPackage = require("../models/ConnectionPackage");
//@route POST api/admin
//@desc Admin login
//@access Public
const createConnectionPackage = async (req, res) => {
  const { name } = req.body;
  try {
    let divName = await ConnectionPackage.findOne({ name });
    //see if user exists
    if (divName) {
      return res.status(400).json({ message: "Connection Package already exist" });
    }
    let connectionPackage = new ConnectionPackage(req.body);
    await connectionPackage.save();
    res.status(200).json({
      message: "Connection Package inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Connection Package
const allConnectionPackages = async (req, res) => {
  try {
    await ConnectionPackage.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Connection Package are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Connection Package By ID//
const connectionPackageById = async (req, res) => {
  await ConnectionPackage.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Connection Package was inserted successfully!",
        status: true,
      });
    }
  });
};

//Update ConnectionPackage
const updateConnectionPackage = async (req, res) => {
  await ConnectionPackage.updateOne(
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
          message: "ConnectionPackage were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete Connection Package
const deleteConnectionPackage = async (req, res) => {
  await ConnectionPackage.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Connection Package was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createConnectionPackage, allConnectionPackages, connectionPackageById, updateConnectionPackage, deleteConnectionPackage };
