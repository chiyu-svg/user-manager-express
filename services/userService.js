const UserModel = require("../model/UserModel");

const userService = {
    createUserService: async (username, password, age) => {
        return UserModel.create({ username, password, age });
    },
    updateUserService: async (userid, username) => {
        // 更新字段
       return UserModel.updateOne({_id: userid}, { username });
    },
    getUserService: async () => {
        // 查询全部数据
        return UserModel.find();
        // 只查询 username 和 age 字段
        // UserModel.find({}, ['username', 'age']).then(data => {
        //   res.send(data);
        // })
    },
    getUserlimitService: async (page, limit) => {
       return UserModel.find().skip((page - 1) * limit).limit(limit).sort({age: 1});
    },
    addUserService: async (username, password, avator) => {
        return UserModel.create({ username, password, avator });
    }
}

module.exports = userService;