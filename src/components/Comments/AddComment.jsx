import React, { Component } from 'react';
import "./AddComment.css";
import * as api from '../../api';

class AddComment extends Component {

    state = {
        error: false
    }

    render() {
        return (
            <div className="AddCommentDiv">
                <form 
                onSubmit={this.handleSubmit}
                className="AddCommentForm">
                <textarea 
                rows="8" 
                cols="100"
                className="AddBody"
                name="body" 
                onChange={(event) => this.handleChange(event.target)}></textarea>
                
                <input 
                
                type="submit" 
                className="SubmitForm"/>
                </form>
                {this.state.error && <h2>*** All fields MUST be completed ***</h2>}
            </div>
        )
    }

    handleChange = ({ name, value }) => {
		this.setState({
			[name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        api.addNewComment(this.state, this.props.user._id, this.props.articleId)
        .then(comment => {
            console.log(comment)
            this.props.addNewComment(comment)
            this.setState({
                error: false
            })
        })
        .catch(err => {
            this.setState({
                error: true
            })
        })
	};
}

export default AddComment

