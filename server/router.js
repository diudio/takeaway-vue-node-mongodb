const express = require('express')
const db = require('./db')
const uploadModel = require('./img-upload')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
const router = express.Router()

app.use(cookieParser())

// 储存用户名密码，顾客注册用
router.post('/customerRegist', function (req, res) {
	var info = req.body.userinfo;
	console.log('前端传来的顾客注册信息为:  ');
  console.log(info);
  new db.customer({
    status: '0',
    username: info.username,
    password: info.password,
    userinfo: {tel: info.tel, mail: info.mail, userImage: ''},
    orderList: [],
    addressList: []
  }).save(function (err) {
    if (err) {
      res.status(500).send()
      return  
    }
    res.send()
  })
})

// 储存用户名密码，商家注册用
router.post('/sellerRegist', function (req, res) {
  var info = req.body.userinfo;
  console.log('前端传来的商户注册信息为:  ');
  console.log(info);
  new db.registSeller({
    status: '1',
    username: info.username,
    password: info.password,
    userinfo: {
      tel: info.tel, 
      mail: info.mail, 
      // userImage: ''
      address: info.address,
      addressinfo: info.addressinfo,
      description: info.description
    },
  }).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

// 根据用户名获取用户， 用于登录、注册时检测
router.get('/getRegistingUser/:name', function (req, res) {
  db.registSeller.findOne({ username: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})
// 根据用户名获取用户， 用于登录、注册时检测
router.get('/getSeller/:name', function (req, res) {
  db.seller.findOne({ username: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})
// 根据用户名获取用户， 用于登录、注册时检测
router.get('/getUser/:name', function (req, res) {
  db.customer.findOne({ username: req.params.name }, function (err, docs1) {
    if (err) {
      console.error(err)
      return
    }
    db.seller.findOne({ username: req.params.name }, function (err, docs2) {
      if (err) {
        console.error(err)
        return
      }
      db.admin.findOne({ username: req.params.name }, function (err, docs3) {
        if (err) {
          console.error(err)
          return
        }
        let docs = docs1 || docs2 || docs3
        res.send(docs)
      })
    })
  })
})

//修改商家信息
router.post('/sellerUpdate/:name', function(req, res) {
  let userinfo = req.body.userinfo
  db.seller.update({ username: userinfo.username }, {
    "foodsCategory": userinfo.foodsCategory,
    "userinfo.name": userinfo.userinfo.name,
    "userinfo.mincost": userinfo.userinfo.mincost,
    "userinfo.time": userinfo.userinfo.time,
    "userinfo.conveyCost": userinfo.userinfo.conveyCost,
    "userinfo.tel": userinfo.userinfo.tel,
    "userinfo.mail": userinfo.userinfo.mail,
    "userinfo.description": userinfo.userinfo.description,
  }, function(err,docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

//登录
router.post('/login', function(req, res) {
  let userinfo = req.body.userinfo
  // console.log(userinfo)

  // req.session.user = req.body.userinfo;
  // console.log(req.cookies)  undefined
  // let name = 'jack'
  // let pas = '123456'
  // if(req.cookies) {
  //   req.cookie.isVisit++
  //   console.log(`cookie, 第${req.cookie.isVisit}次访问`)
  // } else {
  //   console.log('cookie, 第一次访问')
  //   res.cookie("user", `name=${name}&password=${pas}`,{
  //     path:'/' 
  //   })
  // }

  res.send(userinfo)    
})

//接收图片
router.post('/imgUpload/sellerRejist/:_id', function(req,res){
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin","*");
    var _id = req.params._id;
    uploadModel.uploadPhoto(req,'assets', _id, function(err,fields,uploadPath){
        if(err){
            return res.json({
                errCode : 0,
                errMsg : '上传图片错误'
            });
        }
        // console.log(fields);    //表单中字段信息
        // console.log(uploadPath);    //上传图片的相对路径
        res.json({
            errCode : 1,
            errMsg : '上传成功',
            fields :  fields,
            uploadPath : uploadPath
        });
    });
});

router.get('/examineList', function(req, res) {
  db.registSeller.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

//管理员审批通过
router.post('/sellerRejistSuccess/:_id', function(req, res) {
  db.registSeller.remove({ _id: req.params._id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    else {
      let info = req.body.userinfo;
      new db.seller({
        status: '1',
        username: info.username,
        password: info.password,
        userinfo: {
          name: null,
          tel: info.userinfo.tel, 
          mail: info.userinfo.mail, 
          // userImage: ''
          logo: info.userinfo.logo,
          address: info.userinfo.address,
          addressinfo: info.userinfo.addressinfo,
          description: info.userinfo.description
        },
      }).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send()
      })
    }
  })
})

//管理员审批拒绝
router.post('/sellerRejistFail/:_id', function(req, res) {
  db.registSeller.remove({ _id: req.params._id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send()
  })
})

router.post('/addFood/:id', function(req, res) {
  let food = req.body.food;
  let saveFood =  new db.food({
    seller_id: req.params.id,
    name: food.name,
    price: food.price,
    discription: food.discription,
    photo: '',
    category: food.category,
  })
  // console.log(saveFood)
  saveFood.save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    db.seller.findOne({"_id": req.params.id}, function(err, docs1) {
      if (err) {
        console.log(err)
        return 
      }
      let foodsList = docs1.foodsList
      foodsList.push(saveFood['_id'])
      db.seller.update({"_id": req.params.id}, {"foodsList": foodsList}, function(err, docs2) {
        if (err) {
          console.error(err)
          return
        }
        console.log(docs2)
      })
    })
    res.send(saveFood)
  })
})

router.get('/getFoodsList/:id', function(req, res) {
  db.food.find({'seller_id': req.params.id}, function(err, docs) {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

router.get('/getFood/:name', function(req, res) {
  db.food.findOne({'name': req.params.name}, function(err, docs) {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

router.get('/getShops', function(req, res) {
  db.seller.find({}, function(err, docs) {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

router.post('/updateFood', function(req, res) {
  let food = req.body.food
  db.food.update({ '_id': food._id },{ 
    'name': food.name,
    'price': food.price,
    'discription': food.discription,
    'category': food.category
  },function(err, docs) {
    if(err) console.log(err)
    res.send(docs)
  })
})

router.post('/deleteFood/:id', function(req, res) {
  db.food.remove({ '_id': req.params.id },function(err, docs) {
    if(err) console.log(err)
    res.send(docs)
  })
})

router.post('/createOrder', function(req, res) {
  let order = req.body.order
  let seller_id = order.seller_id
  db.seller.findOne({'_id': seller_id}, function(err, docs1) {
    if(err) {
      console.log(err)
      return 
    }
    console.log(docs1.userinfo)
    new db.order({
      customer_id: order.customer_id,
      customerName: order.customername,
      customerTel: order.customerTel,

      seller_id: order.seller_id,
      shopName: docs1.userinfo.name,
      sellerTel: docs1.userinfo.tel,
      
      shopLogo: order.shopLogo,
      total: order.total,
      foodsList: order.foodsList,
      countList: order.countList, 
      priceList: order.priceList,
      nameList: order.nameList,
      conveyCost: order.conveyCost,

      time: {
        postOrderTime: order.postOrderTime,
        sellerGetOrderTime: order.sellerGetOrderTime,
        customerGetFoodTime: order.customerGetFoodTime,
        conveyTime: order.conveyTime
      }
    }).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })  
  })
})

router.get('/getCustomerOrderList/:id', function(req, res) {
  let id = req.params.id
  db.order.find({'customer_id': id}, function(err, docs)   {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

//获取顾客信息，登录状态信息
router.get('/getUser0Info/:id', function(req, res) {
  let id = req.params.id
  console.log(id)
  db.customer.findOne({'_id': id}, function(err, docs)   {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

//获取商家信息，登录状态信息
router.get('/getUser1Info/:id', function(req, res) {
  let id = req.params.id
  db.seller.findOne({'_id': id}, function(err, docs)   {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

//获取管理员信息，登录状态信息
router.get('/getUser2Info/:id', function(req, res) {
  let id = req.params.id
  db.admin.findOne({'_id': id}, function(err, docs)   {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

router.get('/getSellerOrderList/:id', function(req, res) {
    let id = req.params.id
    db.order.find({'seller_id': id}, function(err, docs)   {
    if (err) {
      console.log(err)
      return 
    }
    res.send(docs)
  })
})

console.log('router ok')

module.exports = router


// db.customer.findOne({ username: req.params.name }, function (err, docs) {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   console.log(docs)
  //   if (docs) { res.send(docs); return }
  //   else {
  //     db.seller.findOne({ username: req.params.name }, function (err, docs) {
  //       if (err) {
  //         console.error(err)
  //         return
  //       }
  //       console.log(docs)
  //       if (docs) { res.send(docs); return }
  //       else {
  //         db.admin.findOne({ username: req.params.name }, function (err, docs) {
  //           if (err) {
  //             console.error(err)
  //             return
  //           }
  //           console.log(docs)
  //           if (docs) { res.send(docs); return }
  //         })
  //       }
  //     })
  //   }
  // })