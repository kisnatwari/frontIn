require("dotenv").config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const issService = require("./iss.service");

const create = async (request, expiresIn) => {
    const formdata = request.body;
    const endpoint = request.get('origin');
    const api = request.originalUrl;
    const iss = endpoint + api;

    const token = await jwt.sign({
        iss: iss,
        data: formdata
    }, secretKey, { expiresIn: expiresIn });
    return token;
}

const createCustom = async (data, expiresIn) => {
    const formdata = data.body;
    const iss = data.iss;
    const token = await jwt.sign({
        iss: iss,
        data: formdata
    }, secretKey, { expiresIn: expiresIn });
    return token;
}

const verify = (request) => {
    let token = "";
    if (request.method == 'GET') {
        if (request.headers['x-auth-token']) {
            token = request.headers['x-auth-token'];
        }
        else if (request.cookies.authToken) {
            token = request.cookies.authToken
        }
        else {
            return { isVerified: false, data: null };
        }
    }
    else {
        token = request.body.token;
    }


    if (token) {
        try {
            const tmp = jwt.verify(token, secretKey);
            const requestSource = tmp.iss;
            if (issService.indexOf(requestSource) > -1) {
                return { isVerified: true, data: tmp.data };
            }
            else {
                return { isVerified: false, data: null };
            }
        }
        catch (err) {
            return { isVerified: false, data: null, error: err }
        }
    }
}

module.exports = {
    createToken: create,
    createCustomToken: createCustom,
    verifyToken: verify
}