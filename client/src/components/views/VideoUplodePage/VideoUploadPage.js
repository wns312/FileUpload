import React, { useState } from 'react';
import "./VideoUploadPage.css"
import Dropzone from "react-dropzone"
import {Typography, Button, Form, message, Input} from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import axios from 'axios'

const {TextArea} = Input;
const {Title} = Typography;
//option들 목록
const PrivateOptions = [
  {value : 0, label : "Private"},
  {value : 1, label : "Public" }
]
const CategoryOption = [
  { value : 0, label : "File && Animation"},
  { value : 1, label : "Autos && Vehicles"},
  { value : 2, label : "Music"},
  { value : 3, label : "Pets && Animals"}
]
//컴포넌트 시작
const VideoUploadPage = () => {
  //각 항목의 state값
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [Private, setPrivate] = useState(0); //0이 private, 1이 public
  const [Category, setCategory] = useState("Film & animation");
  const [Filepath, setFilepath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  function onTitleChange(event) {
    setVideoTitle(event.currentTarget.value)
  }
  function onDescriptionChange(event) {
    setVideoDescription(event.currentTarget.value)
  }
  function onPrivateChange(event) {
    setPrivate(event.currentTarget.value)
  }
  function onCategoryChange(event) {
    setCategory(event.currentTarget.value)
  }

  function onDrop(files) {
    let formData = new FormData();
    const config = {
      header : {'content=type' : 'multipart/form-data'}
    }
    formData.append("file", files[0])
    
    axios.post('/api/video/uploadfiles', formData, config)
    .then((response)=>{
      if (response.data.success) {
        console.log(response.data);
        setFilepath(response.data.fileName); // state에 저장 1
        //성공적으로 응답 받고 다시 요청
        let variable = {
          url : response.data.url,
          fileName : response.data.fileName
        }
        axios.post('/api/video/thumbnail', variable)
        .then(response=>{
          if(response.data.success) {
            console.log(response.data);
            setThumbnailPath(response.data.url); // state에 저장 2
            setDuration(response.data.fileDuration); // state에 저장 3           
          }else{
            alert("썸네일 생성에 실패했습니다")
          }
        })

      }else{
        console.log("업로드에 실패했습니다");
      }
    })
  }

  return (
    <div id="videodiv">
      <div id="videodiv2">
    <Title level={2}>비디오 업로드</Title>
      </div>   
      <Form onSubmit>
      <div id="videodiv3">
        {/* drop zone */}
        <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={1000000000}
        >
          {({getRootProps, getInputProps})=>
            <div style={{width : '300px', height :'240px', border:'1px solid lightgray', display : 'flex',
            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
              <input {...getInputProps()}/>
              <PlusOutlined style={{fontSize : '3rem'}}/>
            </div>
          }
        </Dropzone>
        {/* thumbnail */}
        {ThumbnailPath && //있을때만 보여주도록
        <div>
          {console.log(ThumbnailPath)}
          <img src={`http://localhost:5000/${ThumbnailPath}`} alt={"thumbnail"}/>
        </div>
        }
        


      </div>
      <br/><br/>
      <label>Title</label>
        <Input onChange={onTitleChange} value={videoTitle}/>
    <br/><br/>
      <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={videoDescription}/>
        <br/><br/>
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index)=>{
            return <option key={index} value={item.value}>{item.label}</option>
          })}       
        </select>
        <br/><br/>
        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, index)=>{
            return <option key={index} value={item.value}>{item.label}</option>
          })}
        </select>
        <br/><br/>
        <Button type="primary" size="large" onClick>Submit</Button>
      </Form>
    </div>
  );
};
export default VideoUploadPage;