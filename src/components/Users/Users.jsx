import React, { Component } from 'react'
import './Users.css'
import * as api from '../../api'
import Loading from '../Loading/Loading'
import { Link } from '@reach/router'

class Users extends Component {

    state = {
        loading: true
    }


    render() {
        return (
            <div className="FullEachUser">
            {!this.state.loading && <h1 className="FullEachUserH1">Please select a user to view their details...</h1>}
                { this.state.loading ? <Loading /> : 
                this.state.users.map(user => {
                    return (
                        <Link key={user._id} to={`/users/${user.username}`}>
                            <div className="EachUser">
                                <div className="EachUserImage">
                                    <img src={user.avatar_url} alt="User" />
                                </div>
                                <div className="EachUserDetails">
                                    <p>Name: {user.name}</p>
                                    <p className="SecondP">Username: {user.username}</p>
                                </div>
                            </div>
                        </Link>
                    )
                }) }
            
            </div>
        )
    }

    componentDidMount() {
        api.getAllUsers()
        .then(users => {
            this.setState({
                users,
                loading: false
            })
        })
    }
}

export default Users;