import React, { Component } from 'react';
import * as api from '../../api'
import './Comments.css'
import DeleteComment from '../Delete/DeleteComment'
import AddComment from './AddComment'
import { Link } from '@reach/router'
import SpinningLoading from '../Loading/SpinningLoading'

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
        if (this.state.loading) return <SpinningLoading />
        else if (!this.state.loading && this.state.comments.length === 0) return (
            <div>
                <h1>No Comments ere, why not add one below...</h1>
                <button 
                className="AddComment"
                onClick={this.changeAddComment}>
                <h1><em>Add Comment</em></h1></button>
                {this.state.commentAdd && 
                <AddComment 
                addNewComment={this.addNewComment}
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
                        {this.state.commentAdd && !this.props.user.user.username && 
                        <div className="LoginWarning">
                        <h2 className="CommentWarning">In order to add a comment, please login <Link to="/login" className="Here">HERE</Link>...</h2>
                    </div>}
                        {this.state.commentAdd && this.props.user.user.username && 
                        <AddComment 
                        addNewComment={this.addNewComment}
                        user={this.props.user}
                        articleId={this.props.articleId}/>}
                        <div>
                            {this.state.comments.map((comment, index) => {
                            
                                return (
                                    <div key={index} className="CommentsPara">
                                        <p>{comment.body}
                                       
                                        { this.props.user.user.username === comment.created_by.username && 
                                            <DeleteComment 
                                            deletedComment={this.deletedComment}
                                            articleId={this.props.articleId}
                                            id={comment._id}/> }
                                             </p>
                                        <div className="CommentData">
                                            <Link to={`/users/${comment.created_by.username}`}>
                                            <div className="UserProfile">
                                                <img src={ comment.created_by.avatar_url } alt="Avatar"/>
                                                <div className="UserProfileData">
                                                    <h3>{ comment.created_by.username }</h3>
                                                    <h3>{ comment.created_at.split('T')[0]}</h3>
                                                </div>
                                            </div>
                                            </Link>
                                            <h2>Votes: { comment.votes }</h2>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
    }

    deletedComment = (id) => {
        api.deleteComment(id)
        const newArray = this.state.comments.filter(comment => comment._id !== id)
        this.setState({
            comments: newArray
        })
    }

    addNewComment = comment => {
        const newComments = [...this.state.comments, comment]
        this.setState({
            comments: newComments.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        })
    }

    changeAddComment = () => {
        this.setState({
            commentAdd: !this.state.commentAdd
        })
    }
    
    componentDidMount () {
        api.getCommentsByArticle(this.props.articleId)
        .then(comments => {
            const newCommentsList = comments.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
            this.setState({
                comments: newCommentsList,
                loading: false
            })
        })
    }
}

export default Comments