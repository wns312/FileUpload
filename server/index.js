const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const { User } = require('./models/User');
const { mongoURI } = require('./config/key')
const { auth } = require('./middleware/auth')

const videoRouter = require('./routes/video')

//application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 타입 데이터를 분석해 가져올 수 있게 해준다.
app.use(bodyParser.json());
//쿠키파서 사용설정
app.use(cookieParser());

mongoose.connect(mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(() => { console.log("connected") })
.catch((err) => { console.log(err) })

app.use('/uploads', express.static('uploads'));
app.use('/api/video',videoRouter);







//여기는 유저
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) { return res.json({ success: false, err }) }
    return res.status(200).json({
      success: true
    })
  });
})

app.post("/api/users/login", (req, res) => {
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

app.get('/api/users/auth', auth, (req, res) => {
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
app.get('/api/users/logout', auth, (req, res)=>{
  //유저를 찾아왔을테니 업데이트 해주어야 한다
  User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, user)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).send({success : true})
  })
})
const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})