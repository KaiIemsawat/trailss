const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, minLength: 2, maxLength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 6 },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
