import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage';
import UserProfilePri from './components/views/UserProfilePage/UserProfilePri';
import UserProfilePub from './components/views/UserProfilePage/UserProfilePub';
import PlayVideoPage from './components/views/PlayVideoPage/PlayVideoPage'


function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Switch>
      <Route exact path="/" component= {LandingPage}/>
      <Route path="/uploadnew" component={UploadVideoPage} />
      <Route path="/priProfile" component={UserProfilePri} />
      <Route path="/:userID/pubProf" component={UserProfilePub} />
      <Route path="/login"component= {Login}/>
      <Route path="/signup" component={Signup} />
      <Route path="/upload" component={UploadVideoPage} />
      <Route path ="/video/:videoId" component={PlayVideoPage} />
    </Switch>
  </React.Fragment>
  );
}

export default App;

