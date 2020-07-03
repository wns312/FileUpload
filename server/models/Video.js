const mongoose = require('mongoose');
const Schema = mongoose.Schema
const videoSchema = mongoose.Schema({
  writer : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  title : {
    type : String,
    maxlength : 50,
  },
  description : {
    type : String
  },
  privacy : {
    type : Number // 0이 Private, 1이 Public
  },
  filePath : {
    type : String
  },
  category : {
    type : String
  },
  views : {
    type : Number,
    default : 0 // 뷰 수는 0에서 시작하기때문에 0을 넣어주어야한다
  },
  duration : {
    type : String
  },
  thumbnail : {
    type : String
  },

}, 
{
  timestamps : true //이걸 해줘야 만든날짜와 업데이트 날짜가 표시된다
});


const Video = mongoose.model('Video', videoSchema)
module.exports = { Video }