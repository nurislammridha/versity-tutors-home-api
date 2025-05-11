const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createRole, roleById, updateRole, deleteRole, allRoles, allRolesByRoleType, allRolesFilter, roleRegistration, roleLogin } = require("../controllers/roleController");

router.route('/').post(createRole)
router.route('/registration').post(roleRegistration)
router.route('/login').post(roleLogin)
router.route('/').get(allRoles)
router.route('/filter').get(allRolesFilter)
router.route('/role-type').get(allRolesByRoleType)
router.route('/:id').get(roleById)
router.route('/:id').put(updateRole)
router.route('/:id').delete(adminAuth, deleteRole)

module.exports = router;
