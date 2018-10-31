import React, { Component } from 'react';
import * as api from '../../api'
import './Comments.css'

class Comments extends Component {

    state = {
        comments: [],
        loading: true
    }

    render() {
        if (this.state.loading) return <h1>Loading...</h1>
        if (!this.state.loading && this.state.comments.length === 0) return <h1>No Comments ere...</h1>
        return (
            <div>
                <hr className="CommentsHR"/>
                <table>
                    <th>
                        <h1><em>Comments</em></h1>
                    </th>
                    <tr>
                        {this.state.comments.map(comment => {
                            return (
                                <div>
                                    <p>{comment.body}</p>

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