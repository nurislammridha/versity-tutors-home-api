const express = require("express");
const Language = require("../models/Language");
//@route POST api/admin
//@desc Admin login
//@access Public
const createLanguage = async (req, res) => {
  const { languageName } = req.body;
  try {
    let divName = await Language.findOne({ languageName });
    //see if user exists
    if (divName) {
      return res.status(400).json({ message: "Language already exist" });
    }
    let language = new Language({ languageName });
    await language.save();
    res.status(200).json({
      message: "Language inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Language
const allLanguages = async (req, res) => {
  try {
    await Language.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Language are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Language By ID//
const languageById = async (req, res) => {
  await Language.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Language was inserted successfully!",
        status: true,
      });
    }
  });
};

//Update Language
const updateLanguage = async (req, res) => {
  await Language.updateOne(
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
          message: "Language were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete Language
const deleteLanguage = async (req, res) => {
  await Language.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Language was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createLanguage, allLanguages, languageById, updateLanguage, deleteLanguage };
