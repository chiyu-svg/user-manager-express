const mongoose = require("mongoose"); // 这和数据库连接的导入的是同一个对象
const Schema = mongoose.Schema;

const Admin = {
    username: String,
    password: String
};

const AdminModel = mongoose.model("admin", new Schema(Admin));

module.exports = AdminModel;