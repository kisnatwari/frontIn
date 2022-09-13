const databaseService = require("../services/database.service");
const dbService = require("../services/database.service");
const tokenService = require("../services/token.service");

const createUser = async (request, response) => {
    const verifiedToken = await tokenService.verifyToken(request);
    try {
        const userResponse = await dbService.createRecord(verifiedToken.data, "User");
        response.status(200).json({
            isUserCreated: true,
            data: userResponse,
            message: "User created Successfully"
        });
    }
    catch (error) {
        response.status(500).json({
            isUserCreated: false,
            message: "User creation failed ! "
        })
    }
}

const getUserPassword = async (request, response) => {
    const verifiedToken = await tokenService.verifyToken(request);
    if (verifiedToken.isVerified) {
        const query = { uid: verifiedToken.data.uid };
        try {
            const dataRes = await dbService.getRecordByQuery(query, "User");
            if (dataRes.length > 0) {
                response.status(200).json({
                    isCompanyExist: true,
                    data: dataRes[0]
                })
            }
            else {
                response.status(401).json({
                    isCompanyExist: false,
                    message: "User authentication failed"
                });
            }
        }
        catch (error) {
            response.status(401).json({
                isCompanyExist: false,
                message: "Internal Server Error !"
            });
            console.log(error);
        }
    }
}

const createLog = async (request, response) => {
    const token = await tokenService.verifyToken(request);
    if (token.isVerified) {
        const query = { uid: token.data.uid }
        const data = {
            token: request.body.token,
            expiresIn: 86400,
            isLogged: true,
            updatedAt: Date.now()
        }
        const userRes = await databaseService.updateByQuery(query, 'User', data)
        response.status(201).json({ message: "Update Success !" })
    }
    else {
        response.status(401).json({
            message: "Permission Denied !"
        })
    }
}

module.exports = {
    createUser: createUser,
    getUserPassword: getUserPassword,
    createLog: createLog
}