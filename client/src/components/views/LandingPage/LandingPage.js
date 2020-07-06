import React, { useEffect, useState } from 'react';
import './LandingPage.css'
import Axios from 'axios';
import moment from 'moment'
import { Typography, Card, Avatar, Col, Row } from 'antd'
const { Title } = Typography
const { Meta } = Card

const LandingPage = (props) => {
  const [Video, setVideo] = useState([]);
  //useEffect를 사용해서 MongoDB에서 비디오 정보를 가져올 것
  useEffect(() => {
    Axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          //state에 정보 저장하고, set으로 비디오들 넣기
          setVideo(response.data.videos) // 
        } else {
          alert('비디오 가져오기를 실패했습니다')
        }
      })
  }, [])

  const renderCards = Video.map((video, index)=>{
    const minutes = Math.floor(video.duration / 60)
    const seconds = Math.floor(video.duration - minutes * 60)
    return(
      <Col key={index} lg={6} md={8} xs={24}>
          <a href={`/video/post/${video._id}`}>
            <div style={{ position: 'relative' }}>
              <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
              <div className="duration">
                <span>{minutes}:{seconds}</span>
              </div>
            </div>
          </a>
          <br />
          <Meta
            avatar={
              <Avatar src={video.writer.image} />
            }
            title={video.title}
            description=""
          />
          <span>{video.writer.name}</span><br />
          <span style={{ marginLeft: '3rem' }}>{video.views}</span> -
          <span>{moment(video.createAt).format("MMM you")}</span>
        </Col>
    )
  })
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>

        {renderCards}
        
      </Row>
    </div>
  );
};

// const LandingPage = (props) => {
//   function onClickHandler(event) {
//     Axios.get(`api/users/logout`)
//     .then(response=>{
//       if(response.data.success){
//         props.history.push('/login')
//       }else{
//         alert("로그아웃 실패")
//       }

//     })

//   }
//   return (
//     <div id='landingdiv'>
//       <a href="/videoupload">비디오페이지</a>
//       <button onClick={onClickHandler}>로그아웃</button>
//     </div>
//   );
// };
export default LandingPage;