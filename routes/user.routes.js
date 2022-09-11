const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", async (request, response) => {
    const userResponse = await userController.createUser(request, response);
})

module.exports = router;