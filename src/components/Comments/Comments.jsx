import React, { Component } from 'react';
import * as api from '../../api'
import './Comments.css'
import DeleteComment from '../Delete/DeleteComment'
import AddComment from './AddComment'

class Comments extends Component {

    state = {
        comments: [],
        loading: true,
        commentAdd: false
    }


    render() {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
        if (this.state.loading) return <h1>Loading...</h1>
        else if (!this.state.loading && this.state.comments.length === 0) return (
            <div>
                <h1>No Comments ere, why not add one below...</h1>
                <button 
                className="AddComment"
                onClick={this.changeAddComment}>
                <h1><em>Add Comment</em></h1></button>
                {this.state.commentAdd && 
                <AddComment 
                user={this.props.user}
                articleId={this.props.articleId}/>}
            </div>
        ) 
        else return (
                <div style={style}>
                    <hr className="CommentsHR"/>
                    <div className="CommentsFull">
                        <div>
                        <button 
                        className="AddComment"
                        onClick={this.changeAddComment}>
                        <h1><em>Add Comment</em></h1></button>
                        </div>
                        {this.state.commentAdd && 
                        <AddComment 
                        user={this.props.user}
                        articleId={this.props.articleId}/>}
                        <div>
                            {this.state.comments.map((comment, index) => {
                                const { body, created_at, votes, created_by, _id } = comment
                                return (
                                    <div key={index} className="CommentsPara">
                                        <p>{body}
                                        </p>
                                        { this.props.userName === created_by.username && 
                                            <DeleteComment 
                                            articleId={this.props.articleId}
                                            id={_id}/> }
                                        <div className="CommentData">
                                            <div className="UserProfile">
                                                <img src={ created_by.avatar_url } alt="Avatar"/>
                                                <div className="UserProfileData">
                                                    <h3>{ created_by.username }</h3>
                                                    <h3>{created_at.split('T')[0]}</h3>
                                                </div>
                                            </div>
                                            
                                            <h2>Votes: { votes }</h2>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
    }

    changeAddComment = () => {

        this.setState({
            commentAdd: !this.state.commentAdd
        })
    }
    
    componentDidMount () {
        api.getCommentsByArticle(this.props.articleId)
        .then(comments => {
            this.setState({
                comments,
                loading: false
            })
        })
    }
}

export default Comments