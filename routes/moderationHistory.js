const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { updateModerationHistory, deleteModerationHistory, createModerationHistory, allModerationHistorys, moderationhistoryById, allModerationHistorysFIlter } = require("../controllers/moderationHistoryController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(createModerationHistory)
router.route('/').get(allModerationHistorys)
router.route('/filter').get(allModerationHistorysFIlter)
router.route('/:id').get(moderationhistoryById)
router.route('/:id').put(updateModerationHistory)
router.route('/:id').delete(deleteModerationHistory)

module.exports = router;
