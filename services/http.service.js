const ajax = require('supertest');
const postRequest = async (request) => {
    const response = await ajax(request.endpoint)  // request.get('origin') =>  http://localhost:8080    (Domain of a site)
        .post(request.api)   //  /api/private/company   (API url)
        .send(request.data)   // JWT encrypted token containing user data   (Data to be computed)
    return response;
}

const getRequest = async (request) => {

    const response = await ajax(request.endpoint)    // http://localhost:8080
        .get((request.api + "/" + request.data.token))     //  api/private/company  + "/"  +  JWT encrypted token
        .set({ "X-Auth-Token": request.data.token })      //  headers are required for GET request
    return response;
}


module.exports = {
    postRequest: postRequest,
    getRequest: getRequest
}