import React, { Component } from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem("user_name");
    }

    render() {
        return (
            <div>
                 <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Bookmark Locator</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><a href="#"><span className="glyphicon glyphicon-th" aria-hidden="true"></span> Dashboard</a></li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Contacts</a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <NavDropdown title="Authorization" id="basic-nav-dropdown">
                                    <LinkContainer to="/logout">
                                        <MenuItem onClick={this.logout}><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</MenuItem>    
                                    </LinkContainer>      
                                </NavDropdown> 
                            </ul>
                        </div>
                    </div>
               </nav>
            </div>

        )
    }
}

export default Header;

