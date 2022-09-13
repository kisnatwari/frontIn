const express = require('express');
const router = express.Router();
const companyController = require("../controllers/company.controller");
const tokenService = require("../services/token.service");
router.post("/", (request, response) => {
    const verifyToken = tokenService.verifyToken(request);
    if (verifyToken.isVerified) {
        companyController.createCompany(request, response);
    }
    else {
        console.log("Token Verification failed");
    }
})

router.get("/:query", async (request, response) => {
    const companyRes = await companyController.getCompanyData(request, response);
})

module.exports = router;