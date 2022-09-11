const mongo = require("mongoose");
const { Schema } = mongo;

const companySchema = new Schema({
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: String,
    emailVerified: {
        type: Boolean,
        default: false
    },
    mobileVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

companySchema.pre('save', async function (next) {
    const query = { company_name: this.company_name };
    var length = await mongo.model("Company").countDocuments(query);

    if (length == 0)
        next();
    else {
        const cmpErr = {
            label: "Company with this name already available.. Please choose new one",
            field: "company-name"
        };
        throw cmpErr;
    }

});

companySchema.pre('save', async function (next) {
    const query = { email: this.email }
    const length = await mongo.model('Company').countDocuments(query);
    if (length == 0)
        next();
    else {
        const cmpErr = {
            label: "User with this email " + this.email + " already exists. Provide another email..",
            field: "company-email",
            length: length,
            data: await mongo.model('Company').find({ email: this.email })
        };
        throw cmpErr;
    }
})

//create and export a database named companies from the schema companySchema
module.exports = mongo.model("Company", companySchema);      