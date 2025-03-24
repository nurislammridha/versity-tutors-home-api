const express = require("express");
const { createNotification, allNotifications, notificationById, notificationByClient, notificationByAdmin, updateNotification, notificationsAsClickedByAdmin, deleteNotification, notificationsAsClickedByClientInfo } = require("../controllers/notificationController");
const router = express.Router();

router.route('/').post(createNotification)
router.route('/').get(allNotifications)
router.route('/admin').get(notificationByAdmin)
router.route('/client/:id').get(notificationByClient)
router.route('/:id').get(notificationById)

router.route('/admin').put(notificationsAsClickedByAdmin)
router.route('/client/:id').put(notificationsAsClickedByClientInfo)
router.route('/:id').put(updateNotification)
router.route('/:id').delete(deleteNotification)

module.exports = router;
