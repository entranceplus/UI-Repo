import React, { Component } from 'react';
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

    componentDidMount() {
        
    }

    login() {
        let username = this.userName.value;
        let password = this.password.value;

        if (username === "") {
            this.setErrorMessage('Username cannot be empty');
            
        } else if (password === "") {
            this.setErrorMessage('Password cannot be empty');
            
        } else {
            fetch('https://auth.entranceplus.in/auth', {
                credentials: 'same-origin',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "username": this.userName.value,
                    "password": this.password.value
                }),
                headers: new Headers({
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    return response.json();
                } else if (response.status === 503) {
                    this.setErrorMessage('Failed to check-out license');
                } else {
                    this.setErrorMessage('Incorrect Username or Password');
                }
            }.bind(this)).then(json => {
                localStorage.setItem('user_name', this.userName.value);
                localStorage.setItem('access_token', json.access_token);
                localStorage.setItem('token_type', json.token_type);
                window.location.replace("http://localhost:3000/dashboard");
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
        return (
            <div className ="container">
                <div className="wrapper">
                   <h1 className="brand-name">Bookmark Finder</h1>
                    <form action="" method="post" name="Login_Form" className="form-signin">       
                        <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
                        <hr className="colorgraph" /><br/>
                        <div className="row">
                            <span id="loginError" className="help-block">{this.state.loginErrorMessage}</span>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control login-input" name="username" placeholder="email address" ref={(input) => { this.userName = input; }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input  type="password" className="form-control" name="password" placeholder="Password" ref={(input) => { this.password = input; }} />
                            </div>
                        </div>
                        <input type="button" value="Login" className="btn btn-lg btn-primary btn-block" onClick={this.login}
                                onKeyPress={this.onKeyPress} />
                    </form>			
                </div>
            </div>
           
        );
    }
}

export default Login;