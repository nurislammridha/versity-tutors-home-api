const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createBook, bookById, updateBook, deleteBook, allBooks, bookByClientId, bookByBookerId } = require("../controllers/bookController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createBook)
router.route('/').get(allBooks)
router.route('/client').get(bookByClientId)
router.route('/booker').get(bookByBookerId)
router.route('/:id').get(bookById)
router.route('/:id').put(updateBook)
router.route('/:id').delete(adminAuth, deleteBook)

module.exports = router;
