import React, { Component } from 'react';
import './Login.css'

class Login extends Component {

    state = {
        username: ''
    }

    render() {
        
        return (
            <form onSubmit={this.handleChange}>
                <input placeholder="Login..." type="text" name="username" onchange={this.handleChange}/>
                <button onClick={this.handleSubmit} className="InputButton">Login</button>
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