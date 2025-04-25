const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createSubDistrict, subDistrictById, updateSubDistrict, deleteSubDistrict, allSubDistricts, subDistrictByDivision, subDistrictByDistrict, allSubDistrictFilter } = require("../controllers/subDistrictController");

router.route('/').post(adminAuth, createSubDistrict)
router.route('/').get(allSubDistricts)
router.route('/filter').get(allSubDistrictFilter)
router.route('/:id').get(subDistrictById)
router.route('/by-district/:id').get(subDistrictByDistrict)
router.route('/by-division/:id').get(subDistrictByDivision)
router.route('/:id').put(adminAuth, updateSubDistrict)
router.route('/:id').delete(adminAuth, deleteSubDistrict)

module.exports = router;
