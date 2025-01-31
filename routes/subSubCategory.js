const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createSubSubCategory, allSubSubCategories, subSubCategoryById, subSubCategoryBySubCategory, updateSubSubCategory, deleteSubSubCategory } = require("../controllers/subSubCategoryController");

router.route('/').post(adminAuth, createSubSubCategory)
router.route('/').get(allSubSubCategories)
router.route('/:id').get(subSubCategoryById)
router.route('/by-sub-category/:id').get(adminAuth, subSubCategoryBySubCategory)
router.route('/:id').put(adminAuth, updateSubSubCategory)
router.route('/:id').delete(adminAuth, deleteSubSubCategory)

module.exports = router;
