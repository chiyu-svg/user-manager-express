const userService = require("../services/userService");

const useControllers = {
    createUser: async (req, res) => {
        const { username, password, age } = req.body;
        await userService.createUserService(username, password, age);
        res.send({"ok": 1});
    },
    updateUser: async (req, res) => {
      const userid = req.params.userid;
      const { username } = req.body;
      await userService.updateUserService(userid, username);
      res.send({"ok": 1});
    },
    getUsers: async (req, res) => {
       const data = await userService.getUserService();
       res.send(data);
    },
    getUserlimit: async (req, res) => {
      const { page, limit } = req.query;
      // 分页查询
      const data = await userService.getUserlimitService(page, limit);
      res.send(data);
    },
    addUser: async (req, res) => {
      const { username, password } = req.body;
      const avator = req.file.filename;
      await userService.addUserService(username, password, avator);
      res.send({ok: 1});
    }
};

module.exports = useControllers;