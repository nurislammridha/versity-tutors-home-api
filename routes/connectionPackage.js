const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createConnectionPackage, connectionPackageById, updateConnectionPackage, deleteConnectionPackage, allConnectionPackages } = require("../controllers/connectionPackageController");

router.route('/').post(adminAuth, createConnectionPackage)
router.route('/').get(allConnectionPackages)
router.route('/:id').get(connectionPackageById)
router.route('/:id').put(adminAuth, updateConnectionPackage)
router.route('/:id').delete(adminAuth, deleteConnectionPackage)

module.exports = router;
