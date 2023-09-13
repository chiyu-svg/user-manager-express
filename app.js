var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
// const session = require("express-session"); // 配置 seession
// const MongoStore = require('connect-mongo'); // 配置 session 存储在数据库
const JWT = require("./util/JWT");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// 配置seesion 包括配置存进数据库里
// app.use(session({
//   name: "user_manager", // cookie 名称
//   secret: 'cdjckdjckdccdkkcdc',  // 一个加密秘钥，随便写，
//   resave: true,  // 再一次请求刷新生效时间
//   saveUninitialized: true, // 一开始就会生成一个 cookie, 但是无效
//   cookie: { 
//     maxAge: 1000 * 60 * 60,
//     secure: false          // 当为 true 时， 只有https 请求生成
//   },
//   // 将 Session 存在数据库中，这样就算服务器重启也不会退出页面重新验证了
//   store: MongoStore.create({  
//     mongoUrl: 'mongodb://127.0.0.1:27017/user_manager',
//     ttl: 1000 * 60 * 60
//   })
// }))

// 配置 jwt 验证
app.use((req, res, next) => {
  if(req.url.includes("login")){
    next();
    return;
  }
  if(req.headers.Authorization) {
    try {
      const tokenvalue = JWT.verify(req.headers.Authorization.split(" ")[1]);
      if(tokenvalue){
        JWT.generate({_id: tokenvalue._id, username: tokenvalue.username}, "1d"); // 刷新 token 失效时间
        next();
      }
    } catch (error) {
      res.redirect("/login");
    }
  } else {
    next(); // jwt 必须使用前后端分离开发，因为在请求当中不会自己携带token
  }
})

// 配置接受 post 数据格式
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// 校验 seesion 并刷新 Session 失效时间
// app.use((req, res, next) => {
//     if(req.url.includes("login")) {
//       next();
//       return;
//     } 
//     if(req.session.date) {
//        req.session.data = Date.now(); // 重新增加 sesssion 使过期时间刷新
//        next();
//     } else {
//       res.redirect("/login");
//     }
// });

app.use('/', loginRouter);
app.use('/api', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
