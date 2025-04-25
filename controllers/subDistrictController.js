const express = require("express");
const SubDistrict = require("../models/SubDistrict");
//@route POST api/admin
//@desc Admin login
//@access Public
const createSubDistrict = async (req, res) => {
  const { subDistrictName } = req.body;
  try {
    let disName = await SubDistrict.findOne({ subDistrictName });
    //see if user exists
    if (disName) {
      return res.status(400).json({ message: "Sub District already exist" });
    }
    let subdistrict = new SubDistrict(req.body);
    await subdistrict.save();
    res.status(200).json({
      message: "Sub District inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub District
const allSubDistricts = async (req, res) => {
  try {
    await SubDistrict.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All subdistrict are showing!",
          status: true,
        });
      }
    }).populate('divisionInfo').populate('districtInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};
//all Sub District  filter
const allSubDistrictFilter = async (req, res) => {
  try {
    const { search = null, divisionId = null, districtId = null, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    // Search by multiple fields
    if (search && search.length > 0) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { subDistrictName: regex },
      ];
    }

    if (divisionId && divisionId.length > 0) query.divisionId = divisionId;
    if (districtId && districtId.length > 0) query.districtId = districtId;

    const total = await SubDistrict.countDocuments(query);
    const subCat = await SubDistrict.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('divisionInfo districtInfo')

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

//Sub District By ID//
const subDistrictById = async (req, res) => {
  await SubDistrict.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Sub District By Id!",
        status: true,
      });
    }
  }).populate("categoryInfo");
};
//SubDistrict By District ID//
const subDistrictByDistrict = async (req, res) => {
  await SubDistrict.find({ districtId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Sub District By District Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo');
};
//SubDistrict By Division ID//
const subDistrictByDivision = async (req, res) => {
  await SubDistrict.find({ divisionId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "SubDistrict By Division Id!",
        status: true,
      });
    }
  }).populate('divisionInfo').populate('districtInfo');
};

//Update sub district
const updateSubDistrict = async (req, res) => {
  await SubDistrict.updateOne(
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
          message: "Sub District were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub district
const deleteSubDistrict = async (req, res) => {
  await SubDistrict.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Sub District was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createSubDistrict, allSubDistricts, subDistrictById, subDistrictByDivision, subDistrictByDistrict, updateSubDistrict, deleteSubDistrict, allSubDistrictFilter };
