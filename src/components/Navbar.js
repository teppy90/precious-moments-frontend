import "../components/navbar.css"
import React, { Component, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../Services/AuthServices';
import { AuthContext } from '../AuthContext';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UploadVideoPageModal from '../components/views/UploadVideoPage/UploadVideoPageModal';

const Navigationbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    const [isShowUpload, setShowUpload] = useState(false)
    const history = useHistory()


    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                localStorage.removeItem('access_token');
                history.push('/')
            }
        })
    }



    // const handleFilter = event => {
    //     event.preventDefault();
    //     if (event.target.id === "all") {
    //         setDropDownValue(event.target.id);
    //         props.setFilter(null);
    //     } else {
    //         setDropDownValue(event.target.id);
    //         props.setFilter(event.target.id);
    //     }
    // }

    const unauthenticatedNavBar = () => {
        return (
            <>

                <Navbar className="navbar" bg="light" variant="light">
                    <Navbar.Brand href="/">Precious Moments</Navbar.Brand>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>

                    <Nav className="ml-auto">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                  
                </Navbar>

            </>
        )
    }

    const authenticatedNavBar = () => {
        console.log(user)
        return (
            <>

                <Navbar className="navbar" bg="light" variant="light">
                    <Navbar.Brand href="/">Precious Moments</Navbar.Brand>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>

                    </Form>

                   
                    <Nav className="ml-auto">
                    <Nav.Link href={`/priProfile`}> <AccountCircleIcon fontSize="large" />  </Nav.Link>


                    <button type="button"
                        className="btn btn-link nav-link" onClick={()=>setShowUpload(true)}
                        >Upload</button>
                    
                        <button type="button"
                        className="btn btn-link nav-link"
                        onClick={onClickLogoutHandler} ><Link to="/">Logout</Link></button>

                    </Nav>
               
                    <UploadVideoPageModal show={isShowUpload} setShow={setShowUpload} />
                </Navbar>

            </>
        )
    }
    return (
        <>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </>
    )
}

export default Navigationbar;

