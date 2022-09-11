const ajax = require('supertest');
const postRequest = async (request) => {
    //console.log(request);
    const response = await ajax(request.endpoint)  // request.get('origin') =>  http://localhost:8080    (Domain of a site)
        .post(request.api)   //  /api/private/company   (API url)
        .send(request.data)   // JWT encrypted token containing user data   (Data to be computed)
    return response;
}

const getRequest = async (request) => {
    const response = await ajax(request.endpoint)
        .get((request.api + "/" + request.data))
        .set({ "X-Auth-Token": request.data })
}

module.exports = {
    postRequest: postRequest
}