import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Animated} from "react-animated-css";
import {
    signUpAction, 
    selectFetching as signUpLoading,
    selectError as signUpError,
    signUpResp
} from '../actions/signUpAction/signUpAction';
import {
    signInAction, 
    selectFetching as signInLoading,
    selectError as signInError,
    signInResp
} from '../actions/loginAction/loginAction';
import '../css/Login.css';

const mapStateToProps = (state) => {
    return {
        signUpResponse: signUpResp(state),
        processingSignUp: signUpLoading(state),
        signUpErrorResp: signUpError(state),
        signInResponse: signInResp(state),
        processingSignIn: signInLoading(state),
        signInErrorResp: signInError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (postData, callback) => {
            dispatch(signUpAction(postData, callback));
        },
        signIn: (postData, callback) => {
            dispatch(signInAction(postData, callback));
        }
    };
}

class LoginComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginErrorMessage: '',
            isVisibleSignUp: false,
            isVisibleLogin: true
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
            var postData = {
                email: username,
                password: password
            }
            this.doLogin(postData);
        }
    }

    doLogin(postData) {
        this.props.signIn(postData, this.loginResp.bind(this));
    }

    loginResp(resp) {
        if(resp.success) {
            localStorage.setItem('user_name', 'arjita');
            localStorage.setItem('access_token', resp.token);
            window.location.replace("http://localhost:3000/dashboard");
        }
    }

    register = () => {
        let username = this.newuserName.value;
        let password = this.newUserpassword.value;

        if (username === "") {
            this.setErrorMessage('Username cannot be empty');
        } else if (password === "") {
            this.setErrorMessage('Password cannot be empty'); 
        } else {
            var postData = {
                email: username,
                password: password
            }
            this.props.signUp(postData, this.signIn.bind(this, postData));
        }
    }

    signIn = (postData, response) => {
        console.log(this.props.signUpResponse);
        this.doLogin(postData);
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

    showSignUp = () => {
        this.setState({
            isVisibleLogin: false,
            isVisibleSignUp: true
        })
    }

    showSignIn = () => {
        this.setState({
            isVisibleLogin: true,
            isVisibleSignUp: false
        })
    }
    
    render() {
        var errMsg;
        if(this.state.loginErrorMessage) {
            errMsg = this.state.loginErrorMessage;
        } else if(this.props.signUpErrorResp){
            errMsg = this.props.signUpErrorResp;
        } else if(this.props.signInErrorResp) {
            errMsg = this.props.signInErrorResp;
        }
        
        return (
            <div className ="container">
                <div className="wrapper">
                   <h1 className="brand-name">Bookmark Finder</h1>
                   <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" isVisible={this.state.isVisibleLogin} className={this.state.isVisibleLogin ? 'show-form' : 'hide-form'}>
                        <form action="" method="post" name="Login_Form" className='form-signin'>       
                            <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
                            <hr className="colorgraph" /><br/>
                            <div className="row">
                                <span id="loginError" className="help-block">{errMsg}</span>
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
                            <input type="button" value="Sign In" className="btn btn-lg btn-primary btn-block" onClick={this.login}
                                    onKeyPress={this.onKeyPress} />
                            <div>
                                <button id="register_login_btn" type="button" className="btn btn-link" onClick={this.showSignUp}>Register</button>
                                <button id="register_lost_btn" type="button" className="btn btn-link">Lost Password?</button>
                            </div>		
                        </form>	
                    </Animated>
                    {/* Register */}
                    <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" isVisible={this.state.isVisibleSignUp} className={this.state.isVisibleSignUp ? 'show-form' : 'hide-form'}>
                        <form action="" method="post" name="Login_Form" className='form-signup'>       
                            <h3 className="form-signup-heading">Sign Up</h3>
                            <hr className="colorgraph" /><br/>
                            <div className="row">
                                <span id="loginError" className="help-block">{errMsg}</span>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <input type="text" className="form-control login-input" name="username" placeholder="email address" ref={(input) => { this.newuserName = input; }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input  type="password" className="form-control" name="password" placeholder="Password" ref={(input) => { this.newUserpassword = input; }} />
                                </div>
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.register}
                                    disabled={this.props.processingSignUp ? true : false}
                                    onKeyPress={this.onKeyPressRegister}>
                                    {this.props.processingSignUp ? "Processing " : "Sign Up "} {this.props.processingSignUp ? <i className="fa fa-circle-o-notch fa-spin"></i> : null }
                            </button>
                            <div>
                                <button id="register_btn" type="button" className="btn btn-link" onClick={this.showSignIn}>Login</button>
                                <button id="lost_btn" type="button" className="btn btn-link">Lost Password?</button>
                            </div>		
                        </form>	
                    </Animated>
                </div>
            </div>
           
        );
    }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComp);
export default Login;