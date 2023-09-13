var express = require('express');
const loginContrillers = require("../controllers/loginControllers");

var router = express.Router();

/* GET home page. */
router.get('/login', loginContrillers.login);

router.put("/login", loginContrillers.loginVerify);

router.post("/admin", loginContrillers.addAdmin);

router.get("/", loginContrillers.home)


module.exports = router;
