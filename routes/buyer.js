const express = require("express");
const { createBuyer, buyerLogin, deliveryAddress, updateDeliveryAddress, allBuyerList, allBuyerById, updateBuyer, deleteBuyer, socialLogin, sendEmailOtp, checkBuyer, forgetPasswordOtp, setPassword, checkBuyerPhone, createUser } = require("../controllers/buyerController");
const buyerAuth = require('../middleware/buyerAuthMiddleware')
const router = express.Router();

router.route('/').post(createBuyer)
router.route('/send-email-otp').post(sendEmailOtp)
router.route('/check-buyer').post(checkBuyer)
router.route('/check-buyer-phone').post(checkBuyerPhone)
router.route('/forget-password-otp').post(forgetPasswordOtp)
router.route('/set-password').post(setPassword)
router.route('/login').post(buyerLogin)
router.route('/social-login').post(socialLogin)
router.route('/delivery-address').post(deliveryAddress)
router.route('/create-user').post(createUser)
router.route('/update-delivery-address').put(buyerAuth, updateDeliveryAddress)
router.route('/all-buyers').get(allBuyerList)
router.route('/:id').get(allBuyerById)
router.route('/:id').put(buyerAuth, updateBuyer)
router.route('/:id').delete(deleteBuyer)

module.exports = router