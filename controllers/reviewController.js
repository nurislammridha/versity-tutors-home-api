const Review = require("../models/Review");
//@route POST api/admin
//@desc Admin login
//@access Public
const createReview = async (req, res) => {
  try {
    let review = new Review(req.body);
    await review.save();
    res.status(200).json({
      message: "Review inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Review
const allReviews = async (req, res) => {
  try {
    await Review.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All review are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Review By ID//
const reviewById = async (req, res) => {
  await Review.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "All reviews By id!",
        status: true,
      });
    }
  });
};
// Review By Client Id//
const reviewByClientId = async (req, res) => {
  let {
    page = 1, limit = 10, clientId
  } = req.query;
  // Convert page & limit to numbers (optional)
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const totalClients = await Review.countDocuments({ clientId });
  await Review.find({ clientId }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        pagination: {
          total: totalClients,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(totalClients / limitNumber)
        },
        message: "All reviews By client id!",
        status: true,
      });
    }
  })
    .populate("commenterId", "firstName lastName avatar")
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 })
    ;
};

//Update Review
const updateReview = async (req, res) => {
  await Review.updateOne(
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
          message: "Review were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete review
const deleteReview = async (req, res) => {
  await Review.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Review was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createReview, allReviews, reviewById, reviewByClientId, updateReview, deleteReview };
