import React, { Component } from 'react';
import './Votes.css'
import * as api from '../../api'

class Votes extends Component {

    state = {
        vote: true
    }

    render() {
        const arrow = this.state.vote ? 'up' : 'down'
        return (
            <div>
                <i
                onClick={() => {
                    this.updateVote(this.props.id, this.state.vote, this.props.type)
                    this.props.optimisticRendering(this.state.vote)
                }} 
                className={`fas fa-thumbs-${arrow} fa-3x`}></i>
            </div>
        )
    }
    
    updateVote = (id, votes, type) => {
        console.log(id)
        api.updateVotes(id, votes, type)
        .then(() => {
            this.setState({
                vote: !this.state.vote
            })
        })
    }
}
    
export default Votes;
