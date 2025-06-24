const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createInstituteName, instituteNameById, updateInstituteName, deleteInstituteName, allInstituteNames, allInstituteNamesFilter, instituteNameByInstituteType } = require("../controllers/instituteNameController");

router.route('/').post(createInstituteName)
router.route('/').get(allInstituteNames)
router.route('/filter').get(allInstituteNamesFilter)
router.route('/:id').get(instituteNameById)
router.route('/by-institute-type/:id').get(instituteNameByInstituteType)
router.route('/:id').put(updateInstituteName)
router.route('/:id').delete(deleteInstituteName)

module.exports = router;
