import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import {registerUser} from '../../../_actions/user_action'
import './RegisterPage.css'
const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [ Email, setEmail ] = useState("");
  const [ Password, setPassword ] = useState("");
  const [ Name, setName ] = useState("");
  const [ Confirm, setConfirm ] = useState("");

  function onEmailHandler(event) {
    setEmail(event.target.value)
  }
  function onNameHandler(event) {
    setName(event.target.value)
  }
  function onPasswordHandler(event) {
    setPassword(event.target.value)
  }
  function onConfirmHandler(event) {
    setConfirm(event.target.value)
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    if(Password!==Confirm) {
      return alert("비밀번호와 비밀번호확인이 일치하지 않습니다")
    }
    let body = {
      email : Email,
      name : Name,
      password : Password
    }
    dispatch(registerUser(body))
    .then(response=>{
      //payload는 이미 {success: boolean}을 가리키므로 Success라고 하면안됨
      if(response.payload.success){
        props.history.push('/login');
      }else{
        alert("Error")
      }
    }) 
  }
  return (
    <div id ='registerdiv'>
      <form id='registerform' onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <label>Confirm</label>
        <input type="password" value={Confirm} onChange={onConfirmHandler}/>
        <br/>
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;