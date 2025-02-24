const express = require("express");
const { createClient, clientLogin, allClientList, allClientById, updateClient, deleteClient, socialLogin, sendEmailOtp, checkClient, forgetPasswordOtp, setPassword, checkClientPhone, filterClient } = require("../controllers/clientController");
const clientAuth = require('../middleware/clientAuthMiddleware')
const router = express.Router();

router.route('/').post(createClient)
router.route('/filter').post(filterClient)
router.route('/send-email-otp').post(sendEmailOtp)
router.route('/check-client').post(checkClient)
router.route('/check-client-phone').post(checkClientPhone)
router.route('/forget-password-otp').post(forgetPasswordOtp)
router.route('/set-password').post(setPassword)
router.route('/login').post(clientLogin)
router.route('/social-login').post(socialLogin)
router.route('/all-clients').get(allClientList)
router.route('/:id').get(allClientById)
router.route('/:id').put(updateClient)
router.route('/:id').delete(deleteClient)

module.exports = router