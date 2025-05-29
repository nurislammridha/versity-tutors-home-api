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
    const { search = "", page = 1, limit = 10, managerId = null, isTutorAccount } = req.query;

    const matchStage = {};

    if (managerId && managerId.length > 0) {
      matchStage.managerId = managerId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pipeline = [
      {
        $lookup: {
          from: "clients", // must match the collection name in MongoDB
          localField: "clientInfo",
          foreignField: "_id",
          as: "clientInfo"
        }
      },
      {
        $unwind: {
          path: "$clientInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "roleInfo",
          foreignField: "_id",
          as: "roleInfo"
        }
      },
      {
        $unwind: {
          path: "$roleInfo",
          preserveNullAndEmptyArrays: true
        }
      },
    ];

    if (typeof isTutorAccount !== 'undefined') {
      matchStage["clientInfo.isTutorAccount"] = isTutorAccount === 'true';
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Count documents
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await ModerationHistory.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;

    // Paginate
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });

    const results = await ModerationHistory.aggregate(pipeline);

    res.status(200).json({
      result: results,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      message: "ModerationHistorys retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// const allModerationHistorysFIlter = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 10, managerId = null, isTutorAccount } = req.query;
//     let query = {};
//     if (search && search.length > 0) {
//       // const regex = new RegExp(search, "i"); // Case-insensitive search
//       // query.$or = [
//       //   { districtName: regex }
//       // ];
//     }
//     if (managerId && managerId.length > 0) {
//       query.managerId = managerId;
//     }
//     if (isTutorAccount) {
//       query.isTutorAccount = isTutorAccount;
//     }
//     // console.log('query', query)
//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const total = await ModerationHistory.countDocuments(query);
//     const moderationhistorys = await ModerationHistory.find(query)
//       .skip(skip)
//       .sort({ createdAt: -1 })
//       .limit(parseInt(limit))
//       .populate('clientInfo roleInfo')
//     // console.log('moderationhistorys', moderationhistorys)
//     res.status(200).json({
//       result: moderationhistorys,
//       total,
//       currentPage: parseInt(page),
//       totalPages: Math.ceil(total / parseInt(limit)),
//       message: "ModerationHistorys retrieved successfully",
//       status: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Server error",
//     });
//   }
// };

// ModerationHistory By ID//
const moderationhistoryById = async (req, res) => {
  try {
    const data = await ModerationHistory.findById(req.params.id)
      .populate({
        path: 'clientInfo',
        populate: {
          path: 'moderationHistory',
          model: 'ModerationHistory'
        }
      })
      .populate('roleInfo');

    if (!data) {
      return res.status(404).json({
        error: "ModerationHistory not found!",
        status: false,
      });
    }

    res.status(200).json({
      result: data,
      message: "ModerationHistory fetched successfully!",
      status: true,
    });
  } catch (err) {
    console.error("Error fetching moderation history:", err);
    res.status(500).json({
      error: "There was a server side error!",
      status: false,
    });
  }
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
