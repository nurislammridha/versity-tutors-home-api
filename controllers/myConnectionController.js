const MyConnection = require("../models/MyConnection");
//@route POST api/admin
//@desc Admin login
//@access Public
const createMyConnection = async (req, res) => {
  try {
    let myconnection = new MyConnection(req.body);
    await myconnection.save();
    res.status(200).json({
      message: "MyConnection inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all MyConnection
const allMyConnection = async (req, res) => {
  try {
    await MyConnection.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All myconnection are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// MyConnection By ID//
const myConnectionById = async (req, res) => {
  await MyConnection.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "MyConnection was inserted successfully!",
        status: true,
      });
    }
  }).populate("clientId connectionPackageId");
};
//Connection By clientId//
const myConnectionByClientId = async (req, res) => {
  await MyConnection.find({ clientId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      // console.log('data', data)
      res.status(200).json({
        result: data,
        message: "MyConnection are showing!",
        status: true,
      });
    }
  }).populate("clientId connectionPackageId");
};

//Update MyConnection
const updateMyConnection = async (req, res) => {
  await MyConnection.updateOne(
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
          message: "MyConnection were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete myconnection
const deleteMyConnection = async (req, res) => {
  await MyConnection.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "MyConnection was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createMyConnection, allMyConnection, myConnectionById, myConnectionByClientId, updateMyConnection, deleteMyConnection };
