const mongoose = require("mongoose");
const Schema = mongoose.Schema; // 创建模型

const UserType = {
    username: String,
    password: String,
    avator: String
}

// 注意这里有一个不成文规定， 创建的model名称为 user 就会自动对应 users domcument
const UserModel = mongoose.model("user", new Schema(UserType));

module.exports = UserModel;
