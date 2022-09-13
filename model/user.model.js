const mongo = require("mongoose");
const { Schema } = mongo;
const bcrypt = require("../services/bcrypt.service");

const userSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password field is required"]
    },
    token: String,
    expiresIn: Number,
    isLogged: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    const password = this.password;
    const encrypted = await bcrypt.encrypt(password);
    this.password = encrypted;
    next();
})

module.exports = mongo.model("User", userSchema);