import React, { Component } from 'react';

class Login extends Component {

    state = {
        username: ''
    }

    render() {
        
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" onchange={this.handleChange}/>
                <button>Submit Me</button>
            </form>
        )
    }

    handleChange (e) {
        e.preventDefault()
    }

    handleSubmit (e) {
        console.log(e)
    }

}

export default Login