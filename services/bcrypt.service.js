const bcrypt = require('bcrypt');

const encrypt = async (data) => {
    const encrypted = await bcrypt.hash(data.toString(), 12);
    return encrypted;
}

const compare = async (data, hash) => {
    const compare = await bcrypt.compare(data.toString(), hash);
    return compare;
}

module.exports = {
    encrypt: encrypt,
    compare: compare
};