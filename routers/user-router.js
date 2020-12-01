const express = require('express')
const router = express.Router()
const path = require('path');
// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))

router.get('/userinfo', async(req,res) => {
    let id = req.user.id
let sql = 'select id,username, nickname,email,user_pic from myuser where id = ?'
let ret = await db.operateDb(sql, id)
if(ret&&ret.length >0) {
    res.json({
        status:0,
        message:'查询用户信息成功',
        data:ret[0]
    })
}else {
    res.json({
        status:1,
        message:'查询用户信息失败',
        data:null
    })
}

 res.send('userinfo')
})

// 更新密码
router.post('/updatepwd', async(req,res) =>{
let id = req.user.id
let params = req.body
params.oldPwd = utility.md5(params.oldPwd)
params.newPwd = utility.md5(params.newPwd)
let sql = 'update myuser set password = ? where id = ? and password = ?'
let ret = await db.operateDb(sql, [params.newPwd,id,params.oldPwd])
// 3、返回前端结果
if (ret && ret.affectedRows > 0) {
    // 修改成功
    res.json({
      status: 0,
      message: '重置密码成功'
    })
  } else {
    // 修改失败
    res.json({
      status: 1,
      message: '重置密码失败'
    })
  }
})

// 更新头像
router.post('/update/avatar', async(req,res) =>{
    let id = req.user.id
    let params = req.body
    let sql = 'update myuser set user_pic = ? where id = ?'
    let ret = await db.operateDb(sql, [params.avatar,id])
    // 3、返回前端结果
    if (ret && ret.affectedRows > 0) {
        // 修改成功
        res.json({
          status: 0,
          message: '更新头像成功'
        })
      } else {
        // 修改失败
        res.json({
          status: 1,
          message: '更新头像失败'
        })
      }
    })
    
// 更新用户信息
    router.post('/userinfo', async(req,res) =>{
        let params = req.body
        let sql = 'update myuser set nickname = ?, email = ? where id = ?'
        let ret = await db.operateDb(sql, [params.nickname,params.email,params.id])
        // 3、返回前端结果
        if (ret && ret.affectedRows > 0) {
            // 修改成功
            res.json({
              status: 0,
              message: '更新用户信息成功'
            })
          } else {
            // 修改失败
            res.json({
              status: 1,
              message: '更新用户信息失败'
            })
          }
        })
        





module.exports = router

