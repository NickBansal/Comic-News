import React, { Component } from 'react';
import { Link } from '@reach/router';
import Loading from '../Loading/Loading'
import * as api from '../../api'
import UserArticles from '../Articles/UserArticles'
import UserComments from '../Comments/UserComments'


class SingleUser extends Component {    
    
    state = {
        loading: true,
        articlesShow: false,
        commentsShow: false,
        error: false
    }

    render() {
        const style = { marginTop: '60px' }
        if (this.state.loading) return <Loading /> 
        if (this.state.error) return (
            <div>
                <h1 style={style}>'{this.props.username}' does not exist, please try another username</h1>
                <Link to="/users"><button 
                className="InputButton">{'<<'} Back</button></Link>
            </div>
        )
        else return (
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
                        <Link to="/users"><button 
                        className="InputButton">{'<<'} Back</button></Link>
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
        )
    }

    componentDidMount() {
        api.getUserByUsername(this.props.username)
        .then(user => {
            this.setState({
                user,
                loading: false,
                error: false
            })
        })
        .catch(() => {
            this.setState({
                loading: false,
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
}

export default SingleUser;