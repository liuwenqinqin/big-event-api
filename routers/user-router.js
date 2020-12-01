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











module.exports = router

