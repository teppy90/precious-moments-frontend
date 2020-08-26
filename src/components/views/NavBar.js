import React, { Component, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../favicon.png';
import AuthService from '../Services/AuthServices';
import { AuthContext } from '../AuthContext';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import SearchBox from '../SearchBox'; 

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    let [dropDownValue, setDropDownValue] = useState("Please select one of the following");
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

    const handleFilter = event => {
        event.preventDefault();
        if (event.target.id === "all") {
            setDropDownValue(event.target.id);
            props.setFilter(null);
        } else {
            setDropDownValue(event.target.id);
            props.setFilter(event.target.id);
        }
    }

    const unauthenticatedNavBar = () => {
        return (
            <>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-sm-5">
                    <Link to='/'>
                        <img src={logo} alt="store"
                            className='navbar-brand' />
                    </Link>
                    <ul className='navbar-nav align-item-center'>
                        <li className="nav-item ml=5">
                            <div onClick={() => window.location.reload()}>
                                <Link to="/" className="nav-link" >
                                    PRODUCTS
                            </Link>
                            </div>
                        </li>
                    </ul>

                    <div className="input-group">
                        <ButtonGroup>
                            <div className="input-group-prepend">
                                <div className="input-group-text" id="btnGroupAddon">Search by Category</div>
                            </div>
                            <DropdownButton as={ButtonGroup} key="secondary" id="dropdown-variants-secondary" variant="secondary" title={dropDownValue}>
                                <DropdownItem id="all" key="all" onClick={(event) => { handleFilter(event) }}> all </DropdownItem>
                                <DropdownItem id="shoes" key="shoes" onClick={(event) => { handleFilter(event) }}> shoes </DropdownItem>
                                <DropdownItem id="fashion" key="fashion" onClick={(event) => { handleFilter(event) }}> fashion </DropdownItem>
                                <DropdownItem id="bag" key="bag" onClick={(event) => { handleFilter(event) }}> bag </DropdownItem>
                                <DropdownItem id="other" key="other" onClick={(event) => { handleFilter(event) }}> other </DropdownItem>
                            </DropdownButton>
                        </ButtonGroup>
                    </div>


                    <ul className='navbar-nav align-item-center'>
                        <li className="nav-item ml-5">
                            <Link to="/signup" className="nav-link">
                                Sign Up
                            </Link>
                        </li>

                        <li className="nav-item ml-5">
                            <Link to="/login" className="nav-link">
                                Log In
                            </Link>
                        </li>
                    </ul>

                    <Link to='/sell' className="ml-5">
                        <button type='button' className="btn btn-danger">SELL</button>
                    </Link>

                </nav>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-sm-5">
                    <Link to='/'>
                        <img src={logo} alt="store"
                            className='navbar-brand' />
                    </Link>
                    <ul className='navbar-nav align-item-center'>
                        <li className="nav-item ml=5">
                            <div onClick={() => window.location.reload()}>
                                <Link to="/" className="nav-link" >
                                    PRODUCTS
                            </Link>
                            </div>
                        </li>
                    </ul>

                    <div className="input-group">
                        <ButtonGroup>
                            <div className="input-group-prepend">
                                <div className="input-group-text" id="btnGroupAddon">Search by Category</div>
                            </div>
                            <DropdownButton as={ButtonGroup} key="secondary" id="dropdown-variants-secondary" variant="secondary" title={dropDownValue}>
                                <DropdownItem id="all" key="all" onClick={(event) => { handleFilter(event) }}> all </DropdownItem>
                                <DropdownItem id="shoes" key="shoes" onClick={(event) => { handleFilter(event) }}> shoes </DropdownItem>
                                <DropdownItem id="fashion" key="fashion" onClick={(event) => { handleFilter(event) }}> fashion </DropdownItem>
                                <DropdownItem id="bag" key="bag" onClick={(event) => { handleFilter(event) }}> bag </DropdownItem>
                                <DropdownItem id="other" key="other" onClick={(event) => { handleFilter(event) }}> other </DropdownItem>
                            </DropdownButton>
                        </ButtonGroup>
                    </div>


                    <ul className='navbar-nav align-item-center'>
                        <li className="nav-item ml-5">
                            <Link to={`/${user._id}/userprofile`} className="nav-link">
                                {user.username}
                            </Link>
                        </li>

                        <Link to='/sell' className="ml-5">
                            <button type='button' className="btn btn-danger">SELL</button>
                        </Link>

                        <button type="button"
                            className="btn btn-link nav-item nav-link"
                            onClick={onClickLogoutHandler} ><Link to="/">Logout</Link></button>
                    </ul>
                </nav>
            </>
        )
    }
    return (
        <>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </>
    )
}

export default Navbar;

