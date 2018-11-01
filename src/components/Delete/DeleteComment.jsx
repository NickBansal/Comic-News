import React, { Component } from 'react';
import './DeleteComment.css';
import * as api from '../../api';
import { navigate } from '@reach/router';


class DeleteComment extends Component {

    state = {
        articleId: this.props.singleArticleId
    }

    render() {
        return (
            <div className="DeleteButton">
                <button onClick={() => this.removeItem(this.props.id, this.state.articleId)}> DELETE </button>
            </div>
        )
    }

    removeItem = (id, articleId) => {
        if (window.confirm(`Are you sure you want to delete this Comment?`)) {
            api.deleteComment(id)
            .then(() => alert(`Your Comment is now deleted`))
            .then(() => navigate(`/articles/${articleId}`))
        }
    }
}

export default DeleteComment