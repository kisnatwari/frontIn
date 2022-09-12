const express = require('express');
const tokenService = require('../services/token.service');
const router = express.Router();
const httpService = require("../services/http.service");


router.post("/", async (request, response) => {
    const endpoint = request.get('origin');
    const api = '/api/private/company';
    const token = await tokenService.createToken(request, 120);
    const companyRes = await httpService.getRequest({
        endpoint: endpoint,
        api: api,
        data: { token: token }
    });
    if (!companyRes.body.isCompanyExist) {
        console.log("Company Not Found")
    }
    else {
        console.log("Company Found")
    }
    return;
})


module.exports = router;