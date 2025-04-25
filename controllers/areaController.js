const express = require("express");
const Area = require("../models/Area");
//@route POST api/admin
//@desc Admin login
//@access Public
const createArea = async (req, res) => {
  const { areaName } = req.body;
  try {
    let disName = await Area.findOne({ areaName });
    //see if user exists
    if (disName) {
      return res.status(400).json({ message: "Area already exist" });
    }
    let area = new Area(req.body);
    await area.save();
    res.status(200).json({
      message: "Area inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Area
const allAreas = async (req, res) => {
  try {
    await Area.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All area are showing!",
          status: true,
        });
      }
    }).populate('divisionInfo').populate('districtInfo').populate('subDistrictInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};
//all area  filter
const allAreaFilter = async (req, res) => {
  try {
    const { search = null, divisionId = null, districtId = null, subDistrictId = null, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    // Search by multiple fields
    if (search && search.length > 0) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { areaName: regex },
      ];
    }

    if (divisionId && divisionId.length > 0) query.divisionId = divisionId;
    if (districtId && districtId.length > 0) query.districtId = districtId;
    if (subDistrictId && subDistrictId.length > 0) query.subDistrictId = subDistrictId;

    const total = await Area.countDocuments(query);
    const subCat = await Area.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('divisionInfo districtInfo subDistrictInfo')

    res.status(200).json({
      result: subCat,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Sub District retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};
//Area By ID//
const areaById = async (req, res) => {
  await Area.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Area By Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo').populate('subDistrictInfo');
};
//Area By Sub District ID//
const areaBySubDistrict = async (req, res) => {
  await Area.find({ subDistrictId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Area By District Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo').populate('subDistrictInfo');
};
//Area By District ID//
const areaByDistrict = async (req, res) => {
  await Area.find({ districtId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Area By District Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo').populate('subDistrictInfo');
};
//Area By Division ID//
const areaByDivision = async (req, res) => {
  await Area.find({ divisionId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Area By Division Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo');
};

//Update area
const updateArea = async (req, res) => {
  await Area.updateOne(
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
          message: "Area were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete area
const deleteArea = async (req, res) => {
  await Area.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Area was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createArea, allAreas, areaById, areaByDivision, areaByDistrict, updateArea, deleteArea, areaBySubDistrict, allAreaFilter };
