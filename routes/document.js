const express = require("express");
const { createDocument, allDocuments, documentByClientId, documentById, updateDocument, deleteDocument } = require("../controllers/documentController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createDocument)
router.route('/').get(allDocuments)
router.route('/client/:id').get(documentByClientId)
router.route('/:id').get(documentById)
router.route('/:id').put(updateDocument)
router.route('/:id').delete(deleteDocument)

module.exports = router;
