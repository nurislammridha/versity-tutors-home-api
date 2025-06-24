const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createStudyType, updateStudyType, deleteStudyType, allStudyTypes, allStudyTypesFilter, studyTypeById } = require("../controllers/studyTypeController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createStudyType)
router.route('/').get(allStudyTypes)
router.route('/filter').get(allStudyTypesFilter)
router.route('/:id').get(studyTypeById)
router.route('/:id').put(updateStudyType)
router.route('/:id').delete(deleteStudyType)

module.exports = router;
