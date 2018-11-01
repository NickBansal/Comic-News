import React, { Component } from 'react';
import './AddArticle.css'
import * as api from '../../api'

class AddArticle extends Component {

    state = {
        
    }

    render() {
        return (
            <div className="AddArticle">
                <form onSubmit={this.handleSubmit} action="">
                    <input 
                    onChange={(event) => this.handleChange(event.target)}
                    name="title" 
                    type="text" 
                    className="AddTitle"/>
                    <input 
                    onChange={(event) => this.handleChange(event.target)}
                    name="body" 
                    type="text" 
                    className="AddBody"/>
                    <select 
                    onChange={(event) => this.handleChange(event.target)} 
                    name="topic">
                        <option value="coding">Coding</option>
                        <option value="cooking">Cooking</option>
                        <option value="football">Football</option>
                    </select>
                    <input type="submit"/>
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
        api.addNewArticle(this.state)
        .then(console.log)
		// api.addStudent(this.state).then(student => {
		// 	this.props.studentUpdate(student.data.student);
		// });
	};
}


export default AddArticle;