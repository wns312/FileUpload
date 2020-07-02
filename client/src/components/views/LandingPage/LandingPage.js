import React from 'react';
import './LandingPage.css'
import Axios from 'axios';

const LandingPage = (props) => {
  function onClickHandler(event) {
    Axios.get(`api/users/logout`)
    .then(response=>{
      if(response.data.success){
        props.history.push('/login')
      }else{
        alert("로그아웃 실패")
      }
      
    })
    
  }
  return (
    <div id='landingdiv'>
      <a href="/videoupload">비디오페이지</a>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default LandingPage;