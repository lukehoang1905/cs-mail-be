const express = require("express");
const router = express.Router();

// userApi
const userApi = require("./user.api");
router.use("/users", userApi);

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

// messageApi
const messageApi = require("./message.api");
router.use("/messages", messageApi);

module.exports = router;
