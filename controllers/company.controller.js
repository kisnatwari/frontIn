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


const getCompanyId = async (request, response) => {
    const token = await tokenService.verifyToken(request);
    if (token.isVerified) {
        const query = {
            email: token.data.email
        };
        const companyRes = await dbService.getRecordByQuery(query, 'Company');
        if (companyRes.length > 0) {
            await response.status(200).json({
                isCompanyExist: true,
                message: "Company found",
                data: companyRes
            })
        }
        else {
            await response.status(404).json({
                isCompanyExist: false,
                message: "Company not found"
            })
        }
    }
    else {
        response.status(401).json({
            message: "Permission Denied"
        });
    }


}


module.exports = {
    createCompany: createCompany,
    getCompanyId: getCompanyId
}