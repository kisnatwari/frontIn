const express = require('express');
const tokenService = require('../services/token.service');
const router = express.Router();
const httpService = require("../services/http.service");


router.post("/", async (request, response) => {
    const token = await tokenService.createToken(request, 120);
    httpService.getRequest();
    response.status(200).json({
        "message": "success"
    })
})


module.exports = router;