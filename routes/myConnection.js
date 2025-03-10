const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createMyConnection, allMyConnection, myConnectionById, myConnectionByClientId, updateMyConnection, deleteMyConnection } = require("../controllers/myConnectionController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createMyConnection)
router.route('/').get(allMyConnection)
router.route('/by-client/:id').get(myConnectionByClientId)
router.route('/:id').get(myConnectionById)
router.route('/:id').put(updateMyConnection)
router.route('/:id').delete(adminAuth, deleteMyConnection)

module.exports = router;
