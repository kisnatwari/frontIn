const mongo = require("mongoose");
const companySchema = require("../model/company.model");
const userSchema = require("../model/user.model");
const url = "mongodb://localhost:27017/frontIn";
mongo.connect(url);

const schemaList = {
    Company: companySchema,
    User: userSchema
}

const createRecord = async (data, collectionName) => {
    const collection = new schemaList[collectionName](data);
    const dataResponse = await collection.save();
    return dataResponse;
}

const getRecordByQuery = async (query, collectionName) => {
    const currentSchema = schemaList[collectionName];
    const dataRes = await currentSchema.find(query);
    return dataRes;
}

const updateByQuery = async (query, collectionName, data) => {
    const currentSchema = schemaList[collectionName];
    const dataRes = await currentSchema.updateOne(query, data);
    return dataRes;
}



module.exports = {
    createRecord: createRecord,
    getRecordByQuery: getRecordByQuery,
    updateByQuery: updateByQuery
}