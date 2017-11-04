import React, { Component } from 'react';
import Dashboard from 'Dashboard';
import { connect } from 'react-redux';
import '../css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginErrorMessage: ''
        }
    
        // This binding is necessary to make `this` work in the callback
        this.login = this.login.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    login() {
        let username = this.userName.value;
        let password = this.password.value;

        if (username === "") {
            this.setErrorMessage('Username cannot be empty');
            
        } else if (password === "") {
            this.setErrorMessage('Password cannot be empty');
            
        } else {
            console.log('hey ');
            console.log(this.userName.value);
            console.log(this.password.value);

            fetch('https://auth.entranceplus.in/auth', {
                credentials: 'omit',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "username": this.userName.value,
                    "password": this.password.value
                }),
                headers: new Headers({
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Data-Type': "json"
                })
            }).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 503) {
                    this.setErrorMessage('Failed to check-out license');
                } else {
                    this.setErrorMessage('Incorrect Username or Password');
                }
            }.bind(this)).then(json => {
                localStorage.setItem('username', this.userName.value);
                localStorage.setItem('accesstoken', json.access_token);
            });
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    setErrorMessage(message) {
        this.setState({
            loginErrorMessage: message
        });
    }
    
    render() {
        if (this.state.submitted) {
            return <Dashboard />;
        } else {
            return (
                <div className="container">
                    <div className="omb_login">
                        <h3 className="omb_authTitle">Login or <a href="#">Sign up</a></h3>
                        <div className="row omb_row-sm-offset-3 omb_socialButtons">
                            <div className="col-xs-4 col-sm-2">
                                <a href="#" className="btn btn-lg btn-block omb_btn-facebook">
                                    <i className="fa fa-facebook visible-xs"></i>
                                    <span className="hidden-xs">Facebook</span>
                                </a>
                            </div>
                            <div className="col-xs-4 col-sm-2">
                                <a href="#" className="btn btn-lg btn-block omb_btn-twitter">
                                    <i className="fa fa-twitter visible-xs"></i>
                                    <span className="hidden-xs">Twitter</span>
                                </a>
                            </div>	
                            <div className="col-xs-4 col-sm-2">
                                <a href="#" className="btn btn-lg btn-block omb_btn-google">
                                    <i className="fa fa-google-plus visible-xs"></i>
                                    <span className="hidden-xs">Google+</span>
                                </a>
                            </div>	
                        </div>
                        <div className="row omb_row-sm-offset-3 omb_loginOr">
                            <div className="col-xs-12 col-sm-6">
                                <hr className="omb_hrOr"/>
                                <span className="omb_spanOr">or</span>
                            </div>
                        </div>
                        <div className="row omb_row-sm-offset-3">
                            <div className="col-xs-12 col-sm-6">	
                                <form className="omb_loginForm" action="" autoComplete="off">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                        <input type="text" className="form-control" name="username" placeholder="email address" ref={(input) => { this.userName = input; }} />
                                    </div>
                                    <span className="help-block"></span>
                                                        
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                        <input  type="password" className="form-control" name="password" placeholder="Password" ref={(input) => { this.password = input; }} />
                                    </div>
                                    <span className="help-block"></span>

                                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}
                                    onKeyPress={this.onKeyPress}>Login</button>
                                </form>
                            </div>
                        </div>
                        <div className="row omb_row-sm-offset-3">
                            <div className="col-xs-12 col-sm-3">
                                <label className="checkbox">
                                    <input type="checkbox" value="remember-me"/>Remember Me
                                </label>
                            </div>
                            <div className="col-xs-12 col-sm-3">
                                <p className="omb_forgotPwd">
                                    <a href="#">Forgot password?</a>
                                </p>
                            </div>
                        </div>
                    </div>	
                </div>
            );
        }
    }
}

export default Login;