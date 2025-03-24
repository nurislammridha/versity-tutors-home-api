const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
//@route POST api/admin
//@desc Admin login
//@access Public
const createNotification = async (req, res) => {
  try {
    let notification = new Notification(req.body);
    await notification.save();
    res.status(200).json({
      message: "Notification inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Notification
const allNotifications = async (req, res) => {
  try {
    await Notification.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All notification are showing!",
          status: true,
        });
      }
    }).populate('clientInfo');
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//Notification By ID//
const notificationById = async (req, res) => {
  await Notification.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Notification By Id!",
        status: true,
      });
    }
  }).populate("clientInfo");
};
//Notification By client ID//
const notificationByClient = async (req, res) => {
  try {
    const notifications = await Notification.find({ clientInfo: req.params.id, isAdmin: false })
      .populate('clientInfo')
      .sort({ createdAt: -1 }); // Sort by descending order

    const unreadCount = await Notification.countDocuments({
      clientInfo: req.params.id,
      isClicked: false,
      isAdmin: false
    });

    res.status(200).json({
      result: notifications,
      unreadCount: unreadCount,
      message: "Notifications retrieved successfully!",
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};
//Notification By client ID//
const notificationByAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find({ isAdmin: true })
      .populate('clientInfo')
      .sort({ createdAt: -1 }); // Sort by descending order

    const unreadCount = await Notification.countDocuments({
      isAdmin: true,
      isClicked: false
    });

    res.status(200).json({
      result: notifications,
      unreadCount: unreadCount,
      message: "Notifications retrieved successfully!",
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};


//Update notification
const updateNotification = async (req, res) => {
  await Notification.updateOne(
    { _id: req.params.id },
    {
      $set: { isSeen: true },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Notification were updated successfully!",
          status: true,
        });
      }
    }
  );
};
const notificationsAsClickedByClientInfo = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { clientInfo: req.params.id, isAdmin: false },
      { $set: { isClicked: true } }
    );

    res.status(200).json({
      message: "All notifications marked as clicked!",
      modifiedCount: result.modifiedCount,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};
const notificationsAsClickedByAdmin = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { isAdmin: true },
      { $set: { isClicked: true } }
    );

    res.status(200).json({
      message: "All notifications marked as clicked!",
      modifiedCount: result.modifiedCount,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};

//delete notification
const deleteNotification = async (req, res) => {
  await Notification.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Notification was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createNotification, allNotifications, notificationById, notificationByClient, notificationByAdmin, updateNotification, notificationsAsClickedByAdmin, notificationsAsClickedByClientInfo, deleteNotification };
