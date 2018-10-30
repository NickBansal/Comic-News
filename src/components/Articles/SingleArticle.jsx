import React, { Component } from 'react'

class SingleArticle extends Component {

    state = {
        comments: []
    }

    render() {
        const { title, body } = this.props.singleArticle
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
                <button>BACK</button>
            </div> 
        )
    }
}



// __v:
//      0
// _id:
//      "5bd6d45cc22c6502cf177f36"
// belongs_to:
//      "coding"
// body:
//      "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since w…"
// comment_count:
//      0
// created_at:
//      "2017-07-20T20:57:53.256Z"
// created_by:
//      {…}
// __v:
//      0
// _id:
//      "5bd6d45cc22c6502cf177f34"
// avatar_url:
// "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
// name:
// "Jess Jelly"
// username:
// "jessjelly"
// title:
// "The Rise Of Thinking Machines: How IBM's Watson Takes On The World"
// votes:
// 0

export default SingleArticle