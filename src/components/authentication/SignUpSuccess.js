import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SignUpSuccess extends Component {

    render() {
        return (
            <div>
                <h1>Sign Up Successful!</h1>
                <h2 className="nav-item ml=5">
                    <Link to="/" className="nav-link">
                        Go to homepage
                        </Link>
                </h2>
                <h2 className="nav-item ml=5">
                    <Link to="/login" className="nav-link">
                        Login
                        </Link>
                </h2>
            </div>
        );
    }
}

export default SignUpSuccess;