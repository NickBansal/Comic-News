import React, { Component } from 'react';
import "./AddComment.css";
import * as api from '../../api';
import { navigate } from "@reach/router"

class AddComment extends Component {

    state = {

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
        .then(() => {
            navigate(`articles/${this.props.articleId}/comments`)
        })
        .catch(err => console.log(err))
	};
}

export default AddComment

