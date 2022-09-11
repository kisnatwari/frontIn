const tokenService = require("../services/token.service");
const dbService = require("../services/database.service");

const createCompany = async (request, response) => {
    const token = tokenService.verifyToken(request);
    try {
        const insertResponse = await dbService.createRecord(token.data, "Company");
        response.status(200).json({
            isCompanyCreated: true,
            message: "Company created !",
            data: insertResponse
        });
    }
    catch (error) {
        console.log(error);
        if (error.field) {
            response.status(409).json({
                isCompanyCreated: false,
                message: error
            });
        }
        else {
            response.status(400).json({
                isCompanyCreated: false,
                message: "Something Went Wrong",
                error: error
            });
        }
    }
}

module.exports = {
    createCompany: createCompany
}