const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createReview, reviewById, updateReview, deleteReview, allReviews, reviewByClientId } = require("../controllers/reviewController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createReview)
router.route('/').get(allReviews)
router.route('/client').get(reviewByClientId)
router.route('/:id').get(reviewById)
router.route('/:id').put(updateReview)
router.route('/:id').delete(deleteReview)

module.exports = router;
