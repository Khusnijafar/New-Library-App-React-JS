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
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a class="navbar-brand" href="/home"><h3>BOOKS LIBRARY</h3></a>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul class="navbar-nav ml-auto">
                                {(parseInt(localStorage.role_id) === 3) ?
                                    <li class="nav-item dropdown">
                                        {console.log(localStorage.role_id)}
                                            <a href="/history" class="dropdown-item" >Loaning History</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="/home" onClick={this.logout}>Logout</a>                                      
                                    </li>
                                    : (parseInt(localStorage.role_id) === 1) ?
                                    <li class="nav-item dropdown">
                                            <Link to="#" class="dropdown-item" >List User</Link>
                                            <Link to="/return" class="dropdown-item">Loan History</Link>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="/home" onClick={this.logout}>Logout</a>
                                    </li>
                                    :<li class="nav-item">
                                    <a class="nav-link" href="/register">Register</a>
                                    <a class="nav-link" href="/login">Login</a>
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