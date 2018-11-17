import React, { Component } from 'react'
import { Router, Link } from '@reach/router'
import Comments from '../Comments/Comments'
import * as api from '../../api'
import Loading from '../Loading/Loading'
import './Articles.css'
import Votes from '../Votes/Votes'

class SingleArticle extends Component {

    state = {
        singleArticle: {},
        loading: true,
        commentsOff: true,
        error: true,
        optRen: 0
    }

    render() {   
        const style = {
            transform: 'scale(1.6)',
            transition: '0.5s',
        }

        const gray = {
            filter: 'grayscale(80%)'
        }

        if (this.state.loading) return <Loading /> 
        if (this.state.error) return (
            <div>
                <h1>This article does not exist</h1>
                <Link to="/articles"><button className="InputButton">ARTICLES</button></Link>
            </div>
        )
        else return (
        <div>
            <h1 className="SingleArticleTitle">{ this.state.singleArticle.article.title }</h1>
            <p className="SingleArticlePara">{ this.state.singleArticle.article.body }</p>
            <div className="SingleArticle">
                <h2>{ this.state.singleArticle.article.created_by.name }</h2>
                <h2>{ this.state.singleArticle.article.created_at.split('T')[0] }</h2>
                <h2>Votes: {this.state.singleArticle.article.votes + this.state.optRen}</h2>
            </div>
            <div>
                <Votes 
                type={'article'}
                optimisticRendering={this.optimisticRendering}
                id={this.state.singleArticle.article._id}/>
            </div>
            <div className="ButtonLinks">
                {/* <Link to={`/topic/${this.state.singleArticle.article.belongs_to}/articles`}><button className="BackButton">{'<<<'}</button></Link> */}
                <button 
                onClick={() => window.history.back()}
                className="BackButton">{'<<<'}</button>
                <div>

                    <Link to={`/articles/${this.state.singleArticle.article._id}`}>
                    <button 
                    style={!this.state.commentsOff ? style : gray}
                    onClick={this.changeCommentsTrue} 
                    className="CommentButton minus"></button>
                    </Link>

                    <Link to={`/articles/${this.state.singleArticle.article._id}/comments`}>
                    <button 
                    style={this.state.commentsOff ? style : gray}
                    onClick={this.changeCommentsFalse} 
                    className="CommentButton add"></button>
                    </Link>

                </div>
            </div>
            
            <Router>
                <Comments 
                user={this.props.user}
                articleId={ this.state.singleArticle.article._id } 
                path="comments"/>
            </Router>
        </div> 
        )
    }

    componentDidMount () {
        api.getArticleById(this.props.article_id)
        .then(singleArticle => {
            this.setState({
                singleArticle,
                loading: false,
                error: false
            })
        })
        .catch(() => {
            this.setState({
                error: true,
                loading: false
            })
        })
    }

    optimisticRendering = (votes) => {
        const newVote = votes ? 1 : 0
        this.setState({
            optRen: newVote
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