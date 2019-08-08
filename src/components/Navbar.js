import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    logout = (e) => {
        localStorage.removeItem("role_id")
        localStorage.removeItem("card_number")
        localStorage.removeItem("id_user")
        localStorage.removeItem("token")
        window.location.reload();

    }

    render() {
        console.log(this.props.role_id)
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/home"><h3>BOOKS LIBRARY</h3></a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav ml-auto">
                                {(parseInt(localStorage.role_id) === 3) ?
                                    <li className="nav-item dropdown">
                                        {console.log(localStorage.role_id)}
                                            <a href="/history" className="dropdown-item" >Loaning History</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/home" onClick={this.logout}>Logout</a>                                      
                                    </li>
                                    : (parseInt(localStorage.role_id) === 1) ?
                                    <li className="nav-item dropdown">
                                            <Link to="#" className="dropdown-item" >List User</Link>
                                            <Link to="/return" className="dropdown-item">Loan History</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/home" onClick={this.logout}>Logout</a>
                                    </li>
                                    :<li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Header;