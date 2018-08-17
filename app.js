const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()
const router = require('./server/router')
// ./表示当前目录 ../表示上一层
//__dirname为node的全局变量， 为当前文件所在目录的完整目录名
//将路径解析到绝对路径里面
/*
  path.resolve('/foo/bar', './baz')
  // returns '/foo/bar/baz'

  path.resolve('/foo/bar', '/tmp/file/')
  // returns '/tmp/file'
// */
const resolve = file => path.resolve(__dirname, file)

// 设置静态资源访问 游览器中输入/dist虚拟路径（第一个参数）+文件名可以访问./list目录下的文件
app.use('/statics', express.static(resolve('./static')))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

// session
app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'myFoods',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: true,
//     maxAge: 2592000000
//   },
//   store: new MongoStore({
//     url: 'mongodb://localhost:27017/myFoods'
//   })
// }))

// app.use(function(req, res, next) {
//   var _user = req.session.user;
//   app.locals.user = _user;
//   return next();
// })

app.use(router)

app.listen(3000, function () {
  console.log('访问地址为 localhost:3000')
})