const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createArea, areaById, updateArea, deleteArea, allAreas, areaByDivision, areaByDistrict } = require("../controllers/areaController");

router.route('/').post(adminAuth, createArea)
router.route('/').get(allAreas)
router.route('/:id').get(areaById)
router.route('/by-district/:id').get(adminAuth, areaByDistrict)
router.route('/by-division/:id').get(adminAuth, areaByDivision)
router.route('/:id').put(adminAuth, updateArea)
router.route('/:id').delete(adminAuth, deleteArea)

module.exports = router;
