import React, { Component } from 'react';
import * as api from '../../api'
import './Login.css'
import UserArticles from '../Articles/UserArticles';
import UserComments from '../Comments/UserComments'

class Login extends Component {

    state = {
        username: 'tickle122',
        error: false,
        loading: false,
        articlesShow: false,
        commentsShow: false
    }

    render() {
        if (!this.props.user.user) {
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
                        src={ this.props.user.user.avatar_url } 
                        alt={ this.props.user.user.username }/>
                        <div className="LoggedInData">
                            <h1>Hello { this.props.user.user.name }</h1>
                            <h1>You are logged in as { this.props.user.user.username }</h1>
                        </div>
                    </div>
                    <div className="Userstats">
                        <h2>Articles: {this.props.user.articles.length}</h2>
                        <h2>Comments: {this.props.user.comments.length}</h2>
                    </div>
                    <div>
                        <button 
                        onClick={() => {
                            this.props.logOut()
                            this.changeStateLogOut()
                        }}
                        className="InputButton">LogOut</button>
                        <button 
                        onClick={this.getArticles}
                        className="InputButton">Articles</button>
                        <button 
                        onClick={this.getComments}
                        className="InputButton">Comments</button>
                    </div>
                    {this.state.articlesShow && 
                    <UserArticles articles={this.props.user.articles}/>}
                    {this.state.commentsShow && 
                    <UserComments comments={this.props.user.comments}/>}
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

    getArticles = () => {
        this.setState({
            articlesShow: true,
            commentsShow: false
        })
    }

    getComments = () => {
        this.setState({
            articlesShow: false,
            commentsShow: true
        })
    }

    changeStateLogOut = () => {
        this.setState({
            articlesShow: false,
            commentsShow: false,
        })
    }
}

export default Login