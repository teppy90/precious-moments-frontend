import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import PlayVideoPage from './components/views/PlayVideoPage/PlayVideoPage'
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage'

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Switch>
      <Route exact path="/" component= {LandingPage}/>
      <Route path="/login"component= {Login}/>
      <Route path="/signup" component={Signup} />
      <Route path="/upload" component={UploadVideoPage} />
      <Route path ="/video/:videoID" component={PlayVideoPage} />
    </Switch>
  </React.Fragment>
  );
}

export default App;

