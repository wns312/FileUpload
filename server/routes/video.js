const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const multer = require("multer")
const ffmpeg = require("fluent-ffmpeg");

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

    return res.json({success : true, url : res.req.file.path, fileName : res.req.file.filename})
  })
})


router.post('/thumbnail', (req, res)=>{
  let filePath = ''
  let fileDuration = ''
  //ffprobe가 자동으로 비디오 정보 metadata를 가져온다
  ffmpeg.ffprobe(req.body.url, function (err, metadata) { // 비디오경로를 첫번째 인수로받고
    console.dir(metadata); //
    console.log(metadata.format.duration); // 길이 출력
    fileDuration = metadata.format.duration // 길이를 변수저장
  });

  ffmpeg(req.body.url) // 업로드한 비디오 저장경로로 파일을 찾아 조작
    .on('filenames', function (filenames) { // 썸네일 파일이름을 생성
      console.log('Will generate ' + filenames.join(', '))
      console.log(filenames)
      filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () { // 파일이름생성이 끝나고 할 일
      console.log('Screenshots taken')
      return res.json({ success: true, url: filePath, fileDuration: fileDuration })
    })
    .on('error', function (err) { // 에러처리
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({ // 썸네일옵션
      count: 3, // 썸네일개수
      folder: 'uploads/thumbnails', // 이 경로에 썸네일이 저장
      size: '320x240', // 썸네일 크기
      filename: 'thumbnail -%b.png' // -%b : 파일원래이름에서 extension은 뺀 이름
    })
})




module.exports =router