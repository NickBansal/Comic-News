import React, { Component } from 'react'
import { Link } from '@reach/router'
import * as api from '../../api'
import Loading from '../Loading/Loading'

class SingleArticle extends Component {

    state = {
        singleArticle: {},
        loading: true
    }

    render() {    
        const { title, body, created_at, created_by, belongs_to } = this.state.singleArticle
        return this.state.loading ? <Loading /> :
        (
            <div>
                <h1>{ title }</h1>
                <p>{ body }</p>
                <div>
                    <h3>Created: { created_at }</h3>
                    <h3>Author: { created_by.name }</h3>
                </div>
                <Link to={`/topic/${belongs_to}/articles`}><h2 >BACK</h2></Link>
            </div> 
        )
    }

    componentDidMount () {
        api.getArticleById(this.props.article_id)
        .then(singleArticle => {
            this.setState({
                singleArticle,
                loading: false
            })
        })
    }

}

export default SingleArticle


// article_id:
// "5bd6d45cc22c6502cf177f35"
// location:
// {…}
// navigate:
// navigate()
// path:
// "/articles/:article_id"
// uri:
// "/articles/5bd6d45cc22c6502cf177f35"
// State
// singleArticle:
// {…}
// __v:
// 0
// _id:
// "5bd6d45cc22c6502cf177f35"
// belongs_to:
// "coding"
// body:
// "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a produ…"
// comment_count:
// 54
// created_at:
// "2016-08-18T12:07:52.389Z"
// created_by:
// {…}
// __v:
// 0
// _id:
// "5bd6d45cc22c6502cf177f34"
// avatar_url:
// "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
// name:
// "Jess Jelly"
// username:
// "jessjelly"
// title:
// "Running a Node App"
// votes:
// 0