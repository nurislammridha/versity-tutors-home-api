const Origin = require("../models/Origin");
//@route POST api/admin
//@desc Admin login
//@access Public
const createOrigin = async (req, res) => {
  const { originName, originLogo } = req.body;
  try {
    let originInfo = await Origin.findOne({ originName });
    //see if user exists
    if (originInfo) {
      return res.status(400).json({ message: "Origin already exist" });
    }
    let origin = new Origin({ originName, originLogo });
    await origin.save();
    res.status(200).json({
      message: "Origin inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Brand
const allOrigins = async (req, res) => {
  try {
    await Origin.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Origins are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Origin By ID//
const originById = async (req, res) => {
  await Origin.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Origin list by origin id!",
        status: true,
      });
    }
  });
};

//Update Origin
const updateOrigin = async (req, res) => {
  await Origin.updateOne(
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
          message: "Origin were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete origin
const deleteOrigin = async (req, res) => {
  await Origin.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Origin was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createOrigin, allOrigins, originById, updateOrigin, deleteOrigin };
