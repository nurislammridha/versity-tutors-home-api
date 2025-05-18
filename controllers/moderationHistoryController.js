const express = require("express");
const router = express.Router();
const ModerationHistory = require("../models/ModerationHistory");
//@route POST api/admin
//@desc Admin login
//@access Public
const createModerationHistory = async (req, res) => {
  try {

    let moderationhistory = new ModerationHistory(req.body);
    let history = await moderationhistory.save();
    res.status(200).json({
      message: "ModerationHistory inserted succesfully",
      status: true,
      result: history
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all ModerationHistory
const allModerationHistorys = async (req, res) => {
  try {
    await ModerationHistory.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All ModerationHistory are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
const allModerationHistorysFIlter = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, managerId = null } = req.query;
    let query = {};
    if (search && search.length > 0) {
      // const regex = new RegExp(search, "i"); // Case-insensitive search
      // query.$or = [
      //   { districtName: regex }
      // ];
    }
    if (managerId && managerId.length > 0) {
      query.managerId = managerId;
    }
    // console.log('query', query)
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ModerationHistory.countDocuments(query);
    const moderationhistorys = await ModerationHistory.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('clientInfo roleInfo')
    // console.log('moderationhistorys', moderationhistorys)
    res.status(200).json({
      result: moderationhistorys,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "ModerationHistorys retrieved successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// ModerationHistory By ID//
const moderationhistoryById = async (req, res) => {
  await ModerationHistory.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "ModerationHistory was inserted successfully!",
        status: true,
      });
    }
  });
};

//Update ModerationHistory
// const updateModerationHistory = async (req, res) => {
//   await ModerationHistory.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "There was a server side error!",
//         });
//       } else {
//         res.status(200).json({
//           message: "ModerationHistory were updated successfully!",
//           status: true,
//         });
//       }
//     }
//   );
// };
const updateModerationHistory = async (req, res) => {
  try {
    const { statusHistory, ...otherUpdates } = req.body;

    const updatePayload = {};

    // Add non-array fields with $set
    if (Object.keys(otherUpdates).length > 0) {
      updatePayload.$set = otherUpdates;
    }

    // Append new status to the statusHistory array if provided
    if (statusHistory) {
      updatePayload.$push = {
        statusHistory: {
          $each: Array.isArray(statusHistory) ? statusHistory : [statusHistory],
        },
      };
    }

    await ModerationHistory.updateOne(
      { _id: req.params.id },
      updatePayload
    );

    res.status(200).json({
      message: "ModerationHistory was updated successfully!",
      status: true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};

//delete ModerationHistory
const deleteModerationHistory = async (req, res) => {
  await ModerationHistory.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "ModerationHistory was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createModerationHistory, allModerationHistorys, moderationhistoryById, updateModerationHistory, deleteModerationHistory, allModerationHistorysFIlter };
