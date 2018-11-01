import React, { Component } from 'react';
import AddArticle from '../Articles/AddArticle'
import * as api from '../../api'
import './Login.css'

class Login extends Component {

    state = {
        username: 'tickle122',
        usernameChecker: '',
        user: {},
        error: false,
        addArticle: false,
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Cannot find { this.state.usernameChecker }, please try again...</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                        className="LoginInput" 
                        onChange={(e) => this.handleChange(e.target.value)}
                        placeholder="Login..." type="text" name="username" />
                        <button className="InputButton">Login</button>
                    </form>
                </div>
            )
        } else if (!this.state.user) {
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
                        src={ this.state.user.avatar_url } 
                        alt={ this.state.user.username }/>
                        <div className="LoggedInData">
                            <h1>Hello { this.state.user.name }</h1>
                            <h1>You are logged in as { this.state.user.username }</h1>
                        </div>
                    </div>
                    <button 
                    onClick={this.addArticle}
                    className="AddButton">Add New Article</button>
                    <button 
                    onClick={this.clickClear}
                    className="InputButton">LogOut</button>

                    { this.state.addArticle && <AddArticle /> }
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
            error: false,
            usernameChecker: this.state.username
        })
    }

    addArticle = () => {
        this.setState({
            addArticle: !this.state.addArticle
        })
    }

    clickClear = () => {
        localStorage.clear()
        window.location.reload();
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const username = this.state.usernameChecker
        if (prevState.usernameChecker !== username) {
            this.props.changeUsersName(username)
            api.getUserByUsername(this.state.usernameChecker)
            .then(user => {
                this.setState({
                    user
                })
                localStorage.setItem("user", JSON.stringify(user))
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        error: true
                    })
                    localStorage.setItem("error", JSON.stringify(error))
                }
            })
        }
    }
}

export default Login
