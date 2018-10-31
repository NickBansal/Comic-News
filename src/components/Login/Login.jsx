import React, { Component } from 'react';
import * as api from '../../api'
import './Login.css'

class Login extends Component {

    state = {
        username: '',
        usernameChecker: '',
        user: {}
    }

    render() {
        if (!this.state.user.username) {
            return (
                <div>
                    <h1>Please login...</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                        onChange={(e) => this.handleChange(e.target.value)}
                        placeholder="Login..." type="text" name="username" />
                        <button className="InputButton">Login</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="LoggedIn">
                    <img 
                    src={ this.state.user.avatar_url } 
                    alt={ this.state.user.username }/>
                    <div className="LoggedInData">
                        <h1>Hello { this.state.user.name }</h1>
                        <h1>You are logged in as { this.state.user.username }</h1>
                    </div>
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
        this.setState({
            usernameChecker: this.state.username
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const username = this.state.usernameChecker
        if (prevState.usernameChecker !== username) {
            api.getUserByUsername(this.state.usernameChecker)
            .then(user => {
                this.setState({
                    user
                })
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        error: true
                    })
                }
            })
        }
    }
}

export default Login
