import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LoginSuccess extends Component {

    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <h1>Login Successful!</h1>
                        <h2 className="nav-item ml=5">
                            <Link to="/" className="nav-link">
                                Go to homepage
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginSuccess;

