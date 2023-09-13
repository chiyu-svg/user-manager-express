const loginService = require("../services/loginService");
const JWT = require("../util/JWT");

const loginContrillers = {
    loginVerify: async (req, res) => {
        const { username, password } = req.body;
        const data = await loginService.verifyLoginService(username, password);
        if(data.length) {
            // 生成 token
            const token = JWT.generate({ _id: data[0]._id, username: data[0].username }, "1d")
            res.header("Authorization", token);
            // req.session.date = Date.now();  创建 session
            res.send({ok: 1});
        } else {
            res.send({ok: 0});
        }
    },
    addAdmin: async (req, res) => {
        const { username, password } = req.body;
        await loginService.addAdminService(username, password);
        res.send({ok: 1});
    },
    login: (req, res) => {
        res.render("login");
    },
    home: (req, res) => {
        res.render("home");
    }
}

module.exports = loginContrillers;