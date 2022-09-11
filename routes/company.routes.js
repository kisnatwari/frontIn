const express = require('express');
const router = express.Router();
const companyController = require("../controllers/company.controller");
const token = require("../services/token.service");
router.post("/", (request, response) => {
    const verifyToken = token.verifyToken(request);
    if (verifyToken.isVerified) {
        companyController.createCompany(request, response);
    }
    else {
        console.log("Token Verification failed");
    }
})

module.exports = router;