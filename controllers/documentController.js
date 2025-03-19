const Document = require("../models/Document");
//@route POST api/admin
//@desc Admin login
//@access Public
const createDocument = async (req, res) => {
  try {
    let document = new Document(req.body);
    await document.save();
    res.status(200).json({
      message: "Document inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Documents
const allDocuments = async (req, res) => {
  try {
    await Document.find((err, data) => {
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

// Document By ID//
const documentById = async (req, res) => {
  await Document.find({ _id: req.params.id }, (err, data) => {
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
// Document By Client Id//
const documentByClientId = async (req, res) => {
  let clientId = req.params.id;

  await Document.find({ clientId }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "All documents By client id!",
        status: true,
      });
    }
  })
    .sort({ createdAt: -1 })
};

//Update Review
const updateDocument = async (req, res) => {
  await Document.updateOne(
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

//delete document
const deleteDocument = async (req, res) => {
  await Document.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Document was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createDocument, allDocuments, documentById, documentByClientId, updateDocument, deleteDocument };
