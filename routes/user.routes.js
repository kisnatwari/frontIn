const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", async (request, response) => {
    const userResponse = await userController.createUser(request, response);
})

router.get("/:query", async (request, response) => {
    const passwordRes = userController.getUserPassword(request, response);
})

module.exports = router;