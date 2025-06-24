const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createInstituteType, updateInstituteType, deleteInstituteType, allInstituteTypes, allInstituteTypesFilter, instituteTypeById } = require("../controllers/instituteTypeController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createInstituteType)
router.route('/').get(allInstituteTypes)
router.route('/filter').get(allInstituteTypesFilter)
router.route('/:id').get(instituteTypeById)
router.route('/:id').put(updateInstituteType)
router.route('/:id').delete(deleteInstituteType)

module.exports = router;
