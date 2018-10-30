import React, { Component } from 'react'
import { Router, Link } from '@reach/router'
import Comments from '../Comments/Comments'
import * as api from '../../api'
import Loading from '../Loading/Loading'
import './Articles.css'

class SingleArticle extends Component {

    state = {
        singleArticle: {},
        loading: true
    }

    render() {    
        const { title, body, created_at, created_by, belongs_to, _id } = this.state.singleArticle
    
        return this.state.loading ? <Loading /> :
        (
            <div>
                <h1 className="SingleArticleTitle">{ title }</h1>
                <p>{ body }</p>
                <div className="SingleArticle">
                    <h3>Created: { created_at.toString() }</h3>
                    <h3>Author: { created_by.name }</h3>
                </div>
                <Link to={`/topic/${belongs_to}/articles`}><h2 >BACK</h2></Link>
                <Link to={`/articles/${_id}`}>-</Link>{'  |  '}
                <Link to={`/articles/${_id}/comments`}>+</Link>
                <Router>
                    <Comments path="comments"/>
                </Router>
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