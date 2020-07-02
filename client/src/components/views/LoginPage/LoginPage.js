import React, { useState } from 'react';
import './LoginPage.css'
import { useDispatch } from "react-redux"
import {loginUser} from '../../../_actions/user_action'

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [ Email, setEmail ] = useState("");
  const [ Password, setPassword ] = useState("");

  function onEmailHandler(event) {
    setEmail(event.target.value)
  }
  function onPasswordHandler(event) {
    setPassword(event.target.value)
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    let body = {
      email : Email,
      password : Password
    }
    dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess){
        props.history.push('/')
      }else{
        alert("Error")
      }
    }) 
  }
  return (
    <div id ='logindiv'>
      <form id='loginform' onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;