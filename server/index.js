const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const videoRouter = require('./routes/video')
const userRouter = require('./routes/user')
const { mongoURI } = require('./config/key')
mongoose.connect(mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(() => { console.log("DB connected") })
.catch((err) => { console.log(err) })

//application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 타입 데이터를 분석해 가져올 수 있게 해준다.
app.use(bodyParser.json());
//쿠키파서 사용설정
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api/users',userRouter);
app.use('/api/video',videoRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})