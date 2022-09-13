const dbService = require("../services/database.service");
const tokenService = require("../services/token.service");
const checkUserLog = async (request) => {
    const tokenData = await tokenService.verifyToken(request);
    if (tokenData.isVerified) {
        const query = {
            token: request.cookies.authToken,
            isLogged: true
        }
        const userData = await dbService.getRecordByQuery(query, "User");
        return (userData.length > 0)
    }
}

module.exports = {
    checkUserLog: checkUserLog
}