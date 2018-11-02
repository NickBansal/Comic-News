import React, { Component } from 'react';
import './AddArticle.css'
import * as api from '../../api'
import { navigate } from '@reach/router'

class AddArticle extends Component {

    state = {
        user: {}
    }

    render() {
        return (
            <div className="AddArticle">
                <form onSubmit={this.handleSubmit} className="AddArticleForm">
                    <input 
                    placeholder="Title"
                    onChange={(event) => this.handleChange(event.target)}
                    name="title" 
                    type="text" 
                    className="AddTitle"/>
                    <input 
                    placeholder="Body"
                    onChange={(event) => this.handleChange(event.target)}
                    name="body" 
                    type="text" 
                    className="AddBody"/>
                    <div className="SelectSubmit" >
                        <select 
                        onChange={(event) => this.handleChange(event.target)} 
                        name="topic">
                            <option>Please Select a Topic...</option>
                            <option value="coding">Coding</option>
                            <option value="cooking">Cooking</option>
                            <option value="football">Football</option>
                        </select>
                        <input type="submit"/>
                    </div>
                   
                </form>
            </div>
        )
    }

    handleChange = ({ name, value }) => {
		this.setState({
			[name]: value
        });
    };
    
    handleSubmit = event => {
        event.preventDefault();
        api.addNewArticle(this.state, this.props.userId)
        .then(() => {
            this.props.changeTopic(this.state.topic)
            navigate(`topic/${this.state.topic}/articles`)
        })
	};
}


export default AddArticle;