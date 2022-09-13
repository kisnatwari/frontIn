const express = require('express');
const tokenService = require('../services/token.service');
const router = express.Router();
const httpService = require("../services/http.service");
const bcryptService = require('../services/bcrypt.service');


router.post("/", async (request, response) => {
    const endpoint = request.get('origin');
    const api = '/api/private/company';
    let token = await tokenService.createToken(request, 120);
    const companyRes = await httpService.getRequest({
        endpoint: endpoint,
        api: api,
        data: { token: token }
    });
    //console.log(companyRes.body);
    if (companyRes.body.isCompanyExist) {
        const query = {
            body: {
                uid: companyRes.body.data[0]._id
            },
            iss: request.get('origin') + request.originalUrl
        };
        let token = await tokenService.createCustomToken(query, 120);
        const passwordRes = await httpService.getRequest({
            endpoint: request.get('origin'),
            api: "/api/private/user",
            data: { token: token }
        });
        if (passwordRes.body.isCompanyExist) {
            const realPassword = passwordRes.body.data.password;
            const clientPassword = request.body.password;
            const isPasswordMatched = await bcryptService.compare(clientPassword, realPassword);
            if (isPasswordMatched) {
                //store user id in cookie
                const query = {
                    iss: request.get('origin') + request.originalUrl,
                    body: {
                        uid: companyRes.body.data[0]._id
                    }
                };

                //token valid for 7 days
                const authToken = await tokenService.createCustomToken(query, 86400);
                await response.cookie('authToken', authToken, { maxAge: 86400 * 1000 });
                await httpService.putRequest({
                    endpoint: request.get('origin'),
                    api: "/api/private/user",
                    data: { token: authToken }
                })

                response.status(200).json({
                    isLogged: true,
                    message: "Login Success"
                })
            }
            else {
                response.status(400).json({
                    isLogged: false,
                    message: "Password is wrong"
                })
            }
        }
        else {
            response.status(401).json({
                "message": "Company Not Found"
            })
        }
    }
    else {
        response.status(404).json({
            "message": "Company Not Found"
        })
    }
    return;
})


module.exports = router;