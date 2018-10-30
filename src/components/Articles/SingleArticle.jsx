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
                    <h3>Created: { created_at }</h3>
                    <h3>Author: { created_by.name }</h3>
                </div>
                <div>
                    <Link to={`/topic/${belongs_to}/articles`}><button className="BackButton">BACK</button></Link>
                    <Link to={`/articles/${_id}`}>-</Link>{'  |  '}
                    <Link to={`/articles/${_id}/comments`}>+</Link>
                </div>
                
                <Router>
                    <Comments articleId={_id} path="comments"/>
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