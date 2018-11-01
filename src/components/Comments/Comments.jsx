import React, { Component } from 'react';
import * as api from '../../api'
import './Comments.css'
import DeleteComment from '../Delete/DeleteComment'

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
        if (!this.state.loading && this.state.comments.length === 0) return (
            <div>
                <h1>No Comments ere...</h1>
                <button onClick={() => this.changeAddComment}> <h1><em>Comments</em></h1></button>
            </div>
        )

        return (
            <div style={style}>
                <hr className="CommentsHR"/>
                <div className="CommentsFull">
                    <div>
                        <button onClick={() => this.changeAddComment}> Comments </button>
                    </div>
                    {this.state.commentAdd && <h1>Add Comment Here</h1>}
                    <div>
                        {this.state.comments.map((comment, index) => {
                            const { body, created_at, votes, created_by, _id } = comment
                            return (
                                <div key={index} className="CommentsPara">
                                    <p>{body}
                                    
                                    </p>
                                    
                                    <div className="CommentData">
                                        <div className="UserProfile">
                                            <img src={ created_by.avatar_url } alt="Avatar"/>
                                            <div className="UserProfileData">
                                                <h3>{ created_by.username }</h3>
                                                <h3>{created_at.split('T')[0]}</h3>
                                            </div>
                                        </div>
                                        { this.props.userName === created_by.username && 
                                        <DeleteComment 
                                        singleArticleId={this.props.singleArticleId}
                                        id={_id}/> }
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