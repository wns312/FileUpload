import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import VideoUploadPage from './components/views/VideoUplodePage/VideoUploadPage';
import Auth from "./hoc/auth"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)}/>
        <Route exact path="/login" component={Auth(LoginPage, false)}/>
        <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        <Route exact path="/videoupload" component={Auth(VideoUploadPage, true)}/>
      </Switch>
    </Router>
  );
}

export default App;
