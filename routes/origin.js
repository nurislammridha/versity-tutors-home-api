const express = require("express");
const { createOrigin, allOrigins, originById, updateOrigin, deleteOrigin } = require("../controllers/originController");
const adminAuth = require('../middleware/adminAuthMiddleware')
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createOrigin)
router.route('/').get(allOrigins)
router.route('/:id').get(originById)
router.route('/:id').put(adminAuth, updateOrigin)
router.route('/:id').delete(adminAuth, deleteOrigin)
module.exports = router
