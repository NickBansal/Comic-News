import React, { Component } from 'react';
import * as api from '../../api'
import './Login.css'
import UserArticles from '../Articles/UserArticles'

class Login extends Component {

    state = {
        username: 'tickle122',
        error: false,
        loading: false,
        articles: [],
        articlesShow: false,
        comments: [],
        commentsShow: false
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
                    {this.state.error && <h2>Username doesn't exist, please try another username</h2>}
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
                    <div>
                        <button 
                        onClick={() => {
                            this.props.logOut()
                            this.changeStateLogOut()
                        }}
                        className="InputButton">LogOut</button>
                        <button 
                        onClick={() => this.getArticles(this.props.user.username)}
                        className="InputButton">Articles</button>
                        <button 
                        className="InputButton">Comments</button>
                    </div>
                    {this.state.articlesShow && 
                    <UserArticles articles={this.state.articles}/>}
                </div>
            )
        }
    }

    handleChange = username => {
        this.setState({
            username
        })
    }

    changeStateLogOut = () => {
        this.setState({
            articlesShow: false,
            commentsShow: false
        })
    }

    handleSubmit = event => {
        const user = this.state.username
        event.preventDefault();
        api.getUserByUsername(user)
        .then(user => {
            this.props.setUser(user)
            this.setState({
                error: false,
            })
        })
        .catch(error => {
            this.setState({
                error: true
            })
        })
    }

    getArticles = username => {
        api.getArticlesByUser(username)
        .then(articles => {
            this.setState({
                articles,
                articlesShow: !this.state.articlesShow,
                commentsShow: false
            })
        })
    }
}

export default Login
