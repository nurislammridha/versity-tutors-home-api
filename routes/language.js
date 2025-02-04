const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { updateLanguage, deleteLanguage, createLanguage, allLanguages, languageById } = require("../controllers/languageController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createLanguage)
router.route('/').get(allLanguages)
router.route('/:id').get(languageById)
router.route('/:id').put(adminAuth, updateLanguage)
router.route('/:id').delete(adminAuth, deleteLanguage)

module.exports = router;
