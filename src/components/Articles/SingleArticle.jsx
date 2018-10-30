import React, { Component } from 'react'

class SingleArticle extends Component {

    state = {
        comments: []
    }

    render() {
        console.log(this.props.SingleArticle)
        return (
            <div>
                <h1>Title</h1>
                <button onClick={this.props.changeSingleArticle}>BACK</button>
            </div> 
        )
    }
}

export default SingleArticle