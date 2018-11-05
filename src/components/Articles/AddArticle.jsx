import React, { Component } from 'react';
import './AddArticle.css'
import * as api from '../../api'

class AddArticle extends Component {

    state = {
        user: {},
        error: false
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
                    <textarea 
                    placeholder="Body"
                    onChange={(event) => this.handleChange(event.target)}
                    name="body" 
                    
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
                    {this.state.error && <h2 style={{ 'marginBottom': '0'}}>*** All fields MUST be completed ***</h2>}
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
        !this.state.topic ? 
        this.setState({
            error: true
        }) :
        api.addNewArticle(this.state, this.props.user.user._id)
        .then(article => {
           this.props.addNewArticle(article)
           this.setState({
            error: false
           })
        })
        .catch(() => {
            this.setState({
                error: true
            })
        })
	};
}


export default AddArticle;