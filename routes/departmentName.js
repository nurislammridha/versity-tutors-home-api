const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createDepartmentName, departmentNameById, updateDepartmentName, deleteDepartmentName, allDepartmentNames, allDepartmentNamesFilter, departmentNameByStudyType } = require("../controllers/departmentNameController");

router.route('/').post(createDepartmentName)
router.route('/').get(allDepartmentNames)
router.route('/filter').get(allDepartmentNamesFilter)
router.route('/:id').get(departmentNameById)
router.route('/by-department-type/:id').get(departmentNameByStudyType)
router.route('/:id').put(updateDepartmentName)
router.route('/:id').delete(deleteDepartmentName)

module.exports = router;
