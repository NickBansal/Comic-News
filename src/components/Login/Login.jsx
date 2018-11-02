import React, { Component } from 'react';
import * as api from '../../api'
import './Login.css'

class Login extends Component {

    state = {
        username: 'tickle122',
        // error: false,
    }

    

    render() {
        if (!this.props.user.username) {
            return (
                <div>
                    <h1>Please login...</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                        className="LoginInput"
                        onChange={(e) => this.handleChange(e.target.value)}
                        placeholder="Login..." 
                        type="text" 
                        name="username"
                        value={this.state.username}
                        />
                        <button className="InputButton">Login</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="FullLogIn">
                    <div className="LoggedIn">
                        <img 
                        src={ this.props.user.avatar_url } 
                        alt={ this.props.user.username }/>
                        <div className="LoggedInData">
                            <h1>Hello { this.props.user.name }</h1>
                            <h1>You are logged in as { this.props.user.username }</h1>
                        </div>
                    </div>
                    <button 
                    onClick={this.props.logOut}
                    className="InputButton">LogOut</button>
                </div>
            )
        }
    }

    handleChange = username => {
        this.setState({
            username
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        api.getUserByUsername(this.state.username)
        .then(user => {
            this.props.setUser(user)
        })
    }
}

export default Login
