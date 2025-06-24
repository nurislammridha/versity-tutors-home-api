const express = require("express");
const router = express.Router();
const InstituteName = require("../models/InstituteName");
//@route POST api/admin
//@desc Admin login
//@access Public
const createInstituteName = async (req, res) => {
  // const { instituteType, instituteTypeId, instituteTypeInfo, instituteName: name, instituteNameBn } = req.body;
  try {
    // let catName = await InstituteName.findOne({ instituteNameName });
    // //see if user exists
    // if (catName) {
    //   return res.status(400).json({ message: "Sub InstituteType already exist" });
    // }
    // let institute = new InstituteName({ instituteType, instituteTypeId, instituteTypeInfo, instituteName: name, instituteNameBn });
    let institute = new InstituteName(req.body);
    await institute.save();
    res.status(200).json({
      message: "Institute name inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub InstituteType
const allInstituteNames = async (req, res) => {
  try {
    await InstituteName.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All institute names are showing!",
          status: true,
        });
      }
    }).populate('instituteTypeInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//all Sub InstituteType filter
const allInstituteNamesFilter = async (req, res) => {
  try {
    const { search = null, filters = null, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    // Search by multiple fields
    if (search && search.length > 0) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { instituteName: regex },
        { "instituteTypeInfo.instituteType": regex }
      ];
    }
    if (filters && filters.length > 0) {
      query.instituteTypeId = filters;
    }
    const total = await InstituteName.countDocuments(query);
    const subCat = await InstituteName.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('instituteTypeInfo')

    res.status(200).json({
      result: subCat,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Institute retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};

// Institute Name By ID//
const instituteNameById = async (req, res) => {
  await InstituteName.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Institute Name By Id!",
        status: true,
      });
    }
  }).populate("instituteTypeInfo");
};
//InstiTute Name By InstituteType ID//
const instituteNameByInstituteType = async (req, res) => {
  await InstituteName.find({ instituteTypeId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Subject By InstituteType Id!",
        status: true,
      });
    }
  }).populate('instituteTypeInfo');
};

//Update instituteType
const updateInstituteName = async (req, res) => {
  await InstituteName.updateOne(
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
          message: "institute name were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub institutetype
const deleteInstituteName = async (req, res) => {
  await InstituteName.deleteOne({ _id: req.params.id }, (err) => {
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
module.exports = { createInstituteName, allInstituteNames, instituteNameById, instituteNameByInstituteType, updateInstituteName, deleteInstituteName, allInstituteNamesFilter };
