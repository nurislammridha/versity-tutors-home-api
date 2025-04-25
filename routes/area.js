const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createArea, areaById, updateArea, deleteArea, allAreas, areaByDivision, areaByDistrict, areaBySubDistrict, allAreaFilter } = require("../controllers/areaController");

router.route('/').post(createArea)
router.route('/').get(allAreas)
router.route('/filter').get(allAreaFilter)
router.route('/:id').get(areaById)
router.route('/by-sub-district/:id').get(areaBySubDistrict)
router.route('/by-district/:id').get(areaByDistrict)
router.route('/by-division/:id').get(areaByDivision)
router.route('/:id').put(adminAuth, updateArea)
router.route('/:id').delete(adminAuth, deleteArea)

module.exports = router;
