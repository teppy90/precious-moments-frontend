import "../components/navbar.css"
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../Services/AuthServices';
import { AuthContext } from '../AuthContext';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
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

    // const unauthenticatedNavBar = () => {
    //     return (
    //         <>
    //             <Navbar className="navbar" variant="light" style={{ backgroundColor: '#676CFB' }}>
    //                 <Navbar.Brand href="/" style={{ color: "white", fontFamily: 'Brush Script MT', fontWeight: 'bold', fontSize: '30px' }}>Precious Moments</Navbar.Brand>

    //                 <Form inline>
    //                     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //                     <Button variant="outline-primary">Search</Button>
    //                 </Form>

    //                 <Nav className="ml-auto">
    //                     <Nav.Link href="/signup">Sign Up</Nav.Link>
    //                     <Nav.Link href="/login">Login</Nav.Link>
    //                 </Nav>

    //             </Navbar>
    //         </>
    //     )
    // }

    // const authenticatedNavBar = () => {
    //     return (
    //         <>

    //             <Navbar className="navbar" variant="light" style={{ backgroundColor: '#676CFB' }}>
    //                 <Navbar.Brand href="/">Precious Moments</Navbar.Brand>

    //                 <Form inline>
    //                     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //                     <Button variant="outline-primary">Search</Button>

    //                 </Form>

    //                 <Nav className="ml-auto">
    //                     <Nav.Link href={`/priProfile`}> {user ? <img src={user.image || "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png"} className="rounded-circle" style={{ width: '40px' }} /> : <AccountCircleIcon fontSize="large" />} </Nav.Link>

    //                     <button type="button"
    //                         className="btn btn-link nav-link" onClick={() => setShowUpload(true)}
    //                     >Upload</button>

    //                     <button type="button"
    //                         className="btn btn-link nav-link"
    //                         onClick={onClickLogoutHandler} ><Link to="/">Logout</Link></button>
    //                 </Nav>

    //             </Navbar>
    //         </>
    //     )
    // }

    return (
        <>
            <Navbar className="navbar" variant="light" style={{ backgroundColor: '#676CFB', textShadow: '2px 2px black' }}>
                <Navbar.Brand href="/" style={{ color: "white", fontFamily: 'Brush Script MT', fontWeight: 'bold', fontSize: '30px' }}>Precious Moments</Navbar.Brand>

                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>

                {(isAuthenticated) ? (
                    <Nav className="ml-auto">
                        <Nav.Link href={`/priProfile`}> {(user) ? <img src={user.image || "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png"} className="rounded-circle" style={{ width: '40px' }} /> : <AccountCircleIcon fontSize="large" />} </Nav.Link>

                        <button type="button"
                            className="btn btn-link nav-link" onClick={() => setShowUpload(true)}
                            style={{ color: 'white', textShadow: '2px 2px black' }} >Upload</button>

                        <button type="button"
                            className="btn btn-link nav-link"
                            onClick={onClickLogoutHandler}><Link to="/" style={{ color: 'white', textShadow: '2px 2px black' }}>Logout</Link></button>
                    </Nav>
                ) : (
                        <Nav className="ml-auto">
                            <Nav.Link href="/signup" style={{ color: 'white' }}>Sign Up</Nav.Link>
                            <Nav.Link href="/login" style={{ color: 'white' }}>Login</Nav.Link>
                        </Nav>
                    )
                }

            </Navbar>
            {/* {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()} */}
            {(isShowUpload) ? <UploadVideoPageModal show={isShowUpload} setShow={setShowUpload} /> : ''}
        </>
    )
}

export default Navigationbar;

