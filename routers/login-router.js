/*
  拆解独立的路由模块
*/
const express = require('express')
const path = require('path')
const utility = require('utility')
const jwt = require('jsonwebtoken')
// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))
// 拆分路由模块，可以将路由添加到router对象上
// 在入口文件中通过app.use方法把router中的路由配置到全局
const router = express.Router()

// 注册接口
router.post('/reguser', async(req, res) => {
  var params = req.body
  params.password = utility.md5(params.password)
  let csql = 'select id from myuser where username = ?'
  let flag = await db.operateDb(csql, params.username)
  if (flag&&flag.length >0) {
    res.json({
      status:1,
      message:'用户名已经存在'
    })
    return
  }

  var sql = 'insert into myuser set ?'
  let ret = await db.operateDb(sql, params)
  if(ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '注册成功'
    })
  }else {
    res.json({
      status: 1,
      message: '注册失败'
    })
  }
})

// 登录接口
router.post('/login', async(req,res) => {
  let params = req.body
  params.password = utility.md5(params.password)
  let sql = 'select id from myuser where username = ? and password = ?'
  let ret = await db.operateDb(sql,[params.username, params.password])
  if(ret && ret.length > 0) {
    let token = jwt.sign({id: ret[0].id}, 'bigevent', {expiresIn: '2 day'})
    res.json({
      status: 0,
      message: '登录成功',
      token:'Bearer' + token
    })
  }else {
    res.json({
      status: 1,
      message: '用户名或者密码错误'
    })
  }

})

// 测试数据库接口
router.get('/test', async (req, res) => {
  let sql = 'select * from myuser'
  let ret = await db.operateDb(sql, null)
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '查询数据成功',
      data: ret
    })
  } else {
    res.json({
      status: 1,
      message: '查询数据失败'
    })
  }
})


module.exports = router
