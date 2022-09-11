require("dotenv").config();
const express = require('express');
const router = express.Router();
const tokenService = require("../services/token.service");
const httpService = require("../services/http.service");
router.post("/", async (request, response) => {
    //creating token
    const token = await tokenService.createToken(request, 120);
    //preparing token to be sent to /api/private/company


    //api request to store company data excluding password
    console.log(request.get('origin'));
    const companyRes = await httpService.postRequest({
        endpoint: request.get('origin'), //http://localhost:8080
        api: "/api/private/company",
        data: { token: token }   //could be accessed by request.body.token in company api
    });

    ///console.log(companyRes);


    //storing password in seperate collection after company data being stored
    if (companyRes.body.isCompanyCreated) {
        const newUser = {
            body: {
                uid: companyRes.body.data._id,
                password: request.body.password
            },
            iss: request.get('origin') + request.originalUrl
        }
        const userToken = await tokenService.createCustomToken(newUser, 120);
        try {
            const userResponse = await httpService.postRequest({
                endpoint: request.get('origin'),
                api: "/api/private/user",
                data: { token: userToken }
            });
            response.json(userResponse);
        }
        catch (err) {
            //console.log(err);
        }
    }
    else {
        response.status(companyRes.status).json(companyRes);
    }
})

module.exports = router;