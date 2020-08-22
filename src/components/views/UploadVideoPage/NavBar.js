import React, { Component } from 'react'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, 
  MDBNavItem, MDBNavLink, MDBNavbarToggler, 
  MDBCollapse, MDBDropdown, MDBDropdownToggle, 
  MDBDropdownMenu, MDBDropdownItem, MDBIcon, 
} from "mdbreact";
import { Link } from 'react-router-dom';
import api from '../api';

export class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      username: '',
      profileImg: ''
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount = async () => {
    try {
      const response = await api.getUser();
      this.setState({
        username: response.data.username,
        profileImg: response.data.profileImg,
        authenticated: true
      })
    } catch (err) {
      console.log(err)
      this.setState({
        authenticated: false
      })
    }
  }

  logOut = async () => {
    try {
      await api.logOut();
      await localStorage.removeItem("token");
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  renderProfile = () => {
    window.location.href=`/session/profile/${this.state.username}`
  }

  navBarStyle = () => {
    return {
      display : 'flex',
      minWidth: '70%',
      flexFlow: 'row wrap',
      margin :'0 auto'

    }
  }

  render() {
    return (
      <MDBNavbar color="elegant-color" dark expand="md">
        <div style={this.navBarStyle()}>
        <MDBNavbarBrand>
          <Link to='/session/dashboard'><strong className="white-text">Playboy Starter Pack</strong></Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            <MDBNavItem>
              <MDBNavLink to='/session/dashboard'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/session/uservideos">My Videos</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/session/userprofile">My Profile</MDBNavLink>
            </MDBNavItem>

          </MDBNavbarNav>

          <MDBNavbarNav right className= 'justify-content-right'>

            <MDBNavItem className="white-text d-flex align-items-center ml-3">
            <MDBNavLink to="/session/new/video"><MDBIcon icon="plus-circle" className="mr-2" />Upload Video</MDBNavLink>
            </MDBNavItem>

            
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                <strong className='white-text'><MDBIcon icon="user mr-2" />{this.state.username}</strong>
                  
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  {/* <MDBCardTitle className='m-2 border-bottom text-center'>Create Content</MDBCardTitle> */}
                  <MDBDropdownItem onClick={this.renderProfile}><MDBIcon far icon="user-circle" className="mr-2" />Profile</MDBDropdownItem>
                  <MDBDropdownItem className='border-top' onClick={this.logOut}>Sign Out</MDBDropdownItem>
                  {/* {this.redirecting()} */}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        </div>

      </MDBNavbar>
    )
  }
}

export default NavBar
