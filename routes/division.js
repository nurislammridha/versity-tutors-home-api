const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { updateDivision, deleteDivision, createDivision, allDivisions, divisionById, allDivisionsFIlter } = require("../controllers/divisionController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createDivision)
router.route('/').get(allDivisions)
router.route('/filter').get(allDivisionsFIlter)
router.route('/:id').get(divisionById)
router.route('/:id').put(adminAuth, updateDivision)
router.route('/:id').delete(adminAuth, deleteDivision)

module.exports = router;
