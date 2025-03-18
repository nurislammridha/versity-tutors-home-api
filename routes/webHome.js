const express = require("express");
const { webHome } = require("../controllers/webHomeController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').get(webHome)

module.exports = router;
