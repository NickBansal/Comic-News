import React, { Component } from 'react'
import { Router, Link } from '@reach/router'
import Comments from '../Comments/Comments'
import * as api from '../../api'
import Loading from '../Loading/Loading'
import './Articles.css'

class SingleArticle extends Component {

    state = {
        singleArticle: {},
        loading: true,
        commentsOff: true
    }

    render() {    
        const { title, body, created_at, created_by, belongs_to, _id, votes } = this.state.singleArticle

        const style = {
            transform: 'scale(1.6)',
            transition: '0.5s',
        }

        const gray = {
            filter: 'grayscale(80%)'
        }

        return this.state.loading ? <Loading /> :
        (
            <div>
                <h1 className="SingleArticleTitle">{ title }</h1>
                <p>{ body }</p>
                <div className="SingleArticle">
                    <h2>{ created_by.name }</h2>
                    <h2>{ created_at.split('T')[0] }</h2>
                    <h2>Votes: {votes}</h2>
                </div>
                
                <div className="ButtonLinks">
                    <Link to={`/topic/${belongs_to}/articles`}><button className="BackButton">{'<<<'}</button></Link>
                    <div>

                        <Link to={`/articles/${_id}`}>
                        <button 
                        style={!this.state.commentsOff ? style : gray}
                        onClick={this.changeCommentsTrue} 
                        className="CommentButton minus"></button>
                        </Link>

                        <Link to={`/articles/${_id}/comments`}>
                        <button 
                        style={this.state.commentsOff ? style : gray}
                        onClick={this.changeCommentsFalse} 
                        className="CommentButton add"></button>
                        </Link>

                    </div>
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

    changeCommentsTrue = () => {
        this.setState({
            commentsOff: true
        })
    }

    changeCommentsFalse = () => {
        this.setState({
            commentsOff: false
        })
    }
}

export default SingleArticle