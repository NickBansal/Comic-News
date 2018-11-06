import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import Loading from '../Loading/Loading'
import * as api from '../../api'
import UserArticles from '../Articles/UserArticles'
import UserComments from '../Comments/UserComments'


class SingleUser extends Component {    
    
    state = {
        loading: true,
        articlesShow: false,
        commentsShow: false
    }

    render() {
        return this.state.loading ? <Loading /> :
        <div>
            <div className="FullLogIn">
                    <div className="LoggedIn">
                        <img 
                        src={ this.state.user.user.avatar_url } 
                        alt={ this.state.user.user.username }/>
                        <div className="LoggedInData">
                            <h1>Hello { this.state.user.user.name }</h1>
                            <h1 className="SingleUserUsername">Or as you like to be called { this.state.user.user.username }</h1>
                        </div>
                    </div>
                    <div className="Userstats">
                        <h2>Articles: {this.state.user.articles.length}</h2>
                        <h2>Comments: {this.state.user.comments.length}</h2>
                    </div>
                    <div>
                        <button 
                        onClick={() => navigate(-1)}
                        className="InputButton">{'<<'} Back</button>
                        <button 
                        onClick={this.getArticles}
                        className="InputButton">Articles</button>
                        <button 
                        onClick={this.getComments}
                        className="InputButton">Comments</button>
                    </div>
                    {this.state.articlesShow && 
                    <UserArticles articles={this.state.user.articles}/>}
                    {this.state.commentsShow && 
                    <UserComments comments={this.state.user.comments}/>}
                </div>
        </div>
    }

    componentDidMount() {
        api.getUserByUsername(this.props.username)
        .then(user => {
            this.setState({
                user,
                loading: false
            })
        })
        .catch(error => {
            console.log('Username does not exist')
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
}

export default SingleUser;