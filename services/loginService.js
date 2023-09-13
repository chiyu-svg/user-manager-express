const AdminModel = require("../model/AdminModel");

const loginServices = {
    verifyLoginService: async (username, password) => {
       return AdminModel.find({username, password});
    },
    addAdminService: async (username, password) => {
        return AdminModel.create({username, password});
    }
}

module.exports = loginServices;