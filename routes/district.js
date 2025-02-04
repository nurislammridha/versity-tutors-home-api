const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createDistrict, districtById, updateDistrict, deleteDistrict, allDistricts, districtByDivision } = require("../controllers/districtController");

router.route('/').post(adminAuth, createDistrict)
router.route('/').get(allDistricts)
router.route('/:id').get(districtById)
router.route('/by-division/:id').get(adminAuth, districtByDivision)
router.route('/:id').put(adminAuth, updateDistrict)
router.route('/:id').delete(adminAuth, deleteDistrict)

module.exports = router;
