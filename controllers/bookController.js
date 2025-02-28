const Book = require("../models/Book");
//@route POST api/admin
//@desc Admin login
//@access Public
const createBook = async (req, res) => {
  try {
    let book = new Book(req.body);
    await book.save();
    res.status(200).json({
      message: "Book inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Book
const allBooks = async (req, res) => {
  try {
    await Book.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All book are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Book By ID//
const bookById = async (req, res) => {
  await Book.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "All books By id!",
        status: true,
      });
    }
  });
};
// Book By Client Id//
const bookByClientId = async (req, res) => {
  let {
    page = 1, limit = 100, clientId
  } = req.query;
  // Convert page & limit to numbers (optional)
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const totalClients = await Book.countDocuments({ clientId });
  await Book.find({ clientId }, (err, data) => {
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
        message: "All books By client id!",
        status: true,
      });
    }
  })
    .populate("bookerId", "_id firstName lastName phone createdAt")
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 })
    ;
};
// Book By Client Id//
const bookByBookerId = async (req, res) => {
  let {
    page = 1, limit = 100, bookerId, status, clientId = false
  } = req.query;
  // console.log('bookerId', bookerId)
  // Convert page & limit to numbers (optional)
  let query = {}
  if (bookerId) query.bookerId = bookerId
  if (clientId) query.clientId = clientId
  if (status) query.status = status
  // query["bookerId.isTutorAccount"] = isTutorAccount
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const totalClients = await Book.countDocuments(query);
  await Book.find(query, (err, data) => {
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
        message: "All books By client id!",
        status: true,
      });
    }
  })
    .populate("clientId", "_id firstName lastName phone createdAt")
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 })
    ;
};
//Update Book
const updateBook = async (req, res) => {

  await Book.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        console.log('err', err)
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Book were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete book
const deleteBook = async (req, res) => {
  await Book.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Book was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createBook, allBooks, bookById, bookByClientId, updateBook, deleteBook, bookByBookerId };
