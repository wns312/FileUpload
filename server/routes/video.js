const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const multer = require("multer")
//multer설정 해주어야 함
let storage = multer.diskStorage({
  //경로설정
  destination: (req,file,callback)=>{
    callback(null, "uploads/");
  },
  //파일이름설정 : 현재시_원래이름 으로 하였음
  filename: (req,file,callback)=>{
    callback(null, `${Date.now()}_${file.originalname}`);
  },
  //파일종류제한(종류제한은 함수를 따로 만들어야한다)
  // fileFilter: (req,file,callback)=>{
  //   const ext = path.extname(file.originalname)
  //   if(ext !== '.mp4') {
  //     return callback(res.status(400).end('mp4파일만 받을 수 있습니다.'), false)
  //   }
  //   callback(null, true)
  // }
})
//multer함수에 위의 내용을 storage라는 속성이름으로 넣어주었다.
//single은 파일 하나만받는다는 의미
const upload = multer({storage : storage}).single("file");

router.post('/uploadfiles', (req,res)=>{
  console.log();
  //multer설정끝나면 파일업로드하고, 확인해볼것
  upload(req,res,err=>{
    if(err) {
      return res.json({success : false, err})
    }
    return res.json({success : true, url : res.req.file.path, filename : res.req.file.filename})
  })
})

module.exports =router