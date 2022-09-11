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

module.exports = {
    createUser: createUser
}