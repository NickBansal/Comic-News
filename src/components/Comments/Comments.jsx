import React, { Component } from 'react';
import * as api from '../../api'
import './Comments.css'

class Comments extends Component {

    state = {
        comments: [],
        loading: true
    }


    render() {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }

        if (this.state.loading) return <h1>Loading...</h1>
        if (!this.state.loading && this.state.comments.length === 0) return <h1>No Comments ere...</h1>
        return (
            <div style={style}>
                <hr className="CommentsHR"/>
                <table className="CommentsFull">
                    <th>
                        <h1><em>Comments</em></h1>
                    </th>
                    <tr>
                        {this.state.comments.map(comment => {
                            const { body, created_at, votes, created_by } = comment
                            return (
                                <div className="CommentsPara">
                                    <p>{body}</p>
                                    <div className="CommentData">
                                        <div>
                                        <h3>{ created_by.username }</h3>
                                        <h3>{created_at.split('T')[0]}</h3>
                                        </div>
                                        <h3>Votes: { votes }</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </tr>
                </table>
            </div>
        )
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