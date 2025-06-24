const express = require("express");
const router = express.Router();
const DepartmentName = require("../models/DepartmentName");
//@route POST api/admin
//@desc Admin login
//@access Public
const createDepartmentName = async (req, res) => {
  // const { studyType, studyTypeId, studyTypeInfo, departmentName: name, departmentNameBn } = req.body;
  try {
    // let catName = await DepartmentName.findOne({ departmentNameName });
    // //see if user exists
    // if (catName) {
    //   return res.status(400).json({ message: "Sub StudyType already exist" });
    // }
    // let department = new DepartmentName({ studyType, studyTypeId, studyTypeInfo, departmentName: name, departmentNameBn });
    let department = new DepartmentName(req.body);
    await department.save();
    res.status(200).json({
      message: "Department name inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub StudyType
const allDepartmentNames = async (req, res) => {
  try {
    await DepartmentName.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All department names are showing!",
          status: true,
        });
      }
    }).populate('studyTypeInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//all Sub StudyType filter
const allDepartmentNamesFilter = async (req, res) => {
  try {
    const { search = null, filters = null, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    // Search by multiple fields
    if (search && search.length > 0) {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      query.$or = [
        { departmentName: regex },
        { "studyTypeInfo.studyType": regex }
      ];
    }
    if (filters && filters.length > 0) {
      query.studyTypeId = filters;
    }
    const total = await DepartmentName.countDocuments(query);
    const subCat = await DepartmentName.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('studyTypeInfo')

    res.status(200).json({
      result: subCat,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "Department retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};

// Department Name By ID//
const departmentNameById = async (req, res) => {
  await DepartmentName.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Department Name By Id!",
        status: true,
      });
    }
  }).populate("studyTypeInfo");
};
//Department Name By StudyType ID//
const departmentNameByStudyType = async (req, res) => {
  await DepartmentName.find({ studyTypeId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Subject By StudyType Id!",
        status: true,
      });
    }
  }).populate('studyTypeInfo');
};

//Update studyType
const updateDepartmentName = async (req, res) => {
  await DepartmentName.updateOne(
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
          message: "department name were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub studytype
const deleteDepartmentName = async (req, res) => {
  await DepartmentName.deleteOne({ _id: req.params.id }, (err) => {
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
module.exports = { createDepartmentName, allDepartmentNames, departmentNameById, departmentNameByStudyType, updateDepartmentName, deleteDepartmentName, allDepartmentNamesFilter };
