var express = require('express');
const UserModel = require("../model/UserModel");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post('/user/add', userControllers.createUser);

router.post('/user/update/:userid', userControllers.updateUser);

router.get("/user/list", userControllers.getUsers);

router.get("/user/list/limit", userControllers.getUserlimit);

// Restful 风格
router.put('/user/:userid', (req, res) => {
  const userid = req.params.userid;
  const { username } = req.body;
  // 更新字段
  UserModel.updateOne({_id: userid}, { username }).then(data => {
    console.log(data);
  });
  res.send({"ok": 1}); 
})

router.delete('/user/:userid', (req, res) => {
  const userid = req.params.userid;
  console.log("userid", userid);
  // 删除字段
  UserModel.deleteOne({_id: userid}).then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  })
  res.send({"ok": 1});
})

router.post("/user", upload.single("avator"), userControllers.addUser)


module.exports = router;
