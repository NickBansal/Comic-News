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
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                onChange={(e) => this.handleChange(e.target.value)}
                placeholder="Login..." type="text" name="username" />
                <button className="InputButton">Login</button>
            </form>
        )
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
                        user: {error: `${username} is not available`}
                    })
                }
            })
        }
    }
}

export default Login


// api.getUserByUsername(this.state.username)
//         .then(user => {
//             this.setState({
//                 user
//             })
//         })
//         .catch(error => {
//             if (error.response.status === 400) {
//                 this.setState({
//                     message: 'Username does not exist'
//                 })
//             }
//         })