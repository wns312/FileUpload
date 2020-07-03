const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//여기는 유저
router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) { return res.json({ success: false, err }) }
    return res.status(200).json({
      success: true
    })
  });
})

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다",
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      });
    });
  });
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    userId: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    image: req.user.image
  })
})
//로그아웃
router.get('/logout', auth, (req, res)=>{
  //유저를 찾아왔을테니 업데이트 해주어야 한다
  User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, user)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).send({success : true})
  })
})

module.exports =router