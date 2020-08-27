import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'


function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Switch>
     <UploadVideoPage />
      <Route exact path="/" component= {LandingPage}/>
      <Route path="/login"component= {Login}/>
      <Route path="/signup" component={Signup} />
    </Switch>
  </React.Fragment>
  );
}

export default App;
