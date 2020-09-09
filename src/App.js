import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage';
import UserProfilePri from './components/views/UserProfilePage/UserProfilePri';
import UserProfilePub from './components/views/UserProfilePage/UserProfilePub';
import PlayVideoPage from './components/views/PlayVideoPage/PlayVideoPage';
import PrivateRoute from './hocs/PrivateRoute';

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Switch>
      <Route exact path="/" component= {LandingPage}/>
      <PrivateRoute path="/priProfile" component={UserProfilePri} />
      <Route path="/:userID/pubProf" component={UserProfilePub} />
      <Route path="/login"component= {Login}/>
      <Route path="/signup" component={Signup} />
      <Route path ="/video/:videoId" component={PlayVideoPage} />

    </Switch>
  </React.Fragment>
  );
}

export default App;

