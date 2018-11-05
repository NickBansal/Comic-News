import React, { Component } from 'react';
import './AllArticles.css'
import * as api from '../../api'
import { Link } from "@reach/router"
import Loading from '../Loading/Loading';
import AddArticle from './AddArticle'

class AllArticles extends Component {

    state = {
        articles: [],
        loading: true,
        columnReverse: false,
        addArticle: false
    }

    render () {

        const style = (!this.state.columnReverse) ? {flexDirection: 'column'} : {flexDirection: 'column-reverse'}

        if (this.state.loading) return <Loading />
        else return (
            <div>
                <div className="AllArticlesSelection">
                    <div
                    onClick={this.showAddArticle} 
                    className="AddNewArticle">
                    </div>
                    <ul>
                        <div className="SortItems">
                            <li onClick={this.SortByVotes}></li>
                            <h2>Votes</h2>
                        </div>
                        <div className="SortItems">
                            <li onClick={this.SortByCreated}></li>
                            <h2>Created</h2>
                        </div>
                        <div className="SortItems">
                            <li onClick={this.SortByComments}></li>
                            <h2>Comments</h2>
                        </div>
                    </ul>
                </div>
                {
                    this.state.addArticle && !this.props.user.user && 
                    <div className="LoginWarning">
                        <h2>In order to add an article, please login <Link to="/login" className="Here">HERE</Link>...</h2>
                    </div>
                    
                }
                {this.state.addArticle && this.props.user.user &&
                <AddArticle 
                user={this.props.user}
                addNewArticle={this.addNewArticle}/> }
                <div style={style} className="AllArticles">
                    {this.state.articles.map(article => {
                    return (
                        <div key={article._id}>
                            <Link to={`/articles/${article._id}`}>
                            <div className="Article">
                                <h1>{article.title}</h1>
                                <p>{article.body.substr(0,100) + '...'}</p>
                                <div className="articleStats">
                                    <h3>Comment Count: {article.comments}</h3>
                                    <h3>Votes: {article.votes}</h3>
                                </div>
                                <hr className="ArticleHR"/>
                            </div>
                        </Link>
                        </div>
                    )
                })}
            </div>
        </div>
        )
    }

    SortByVotes = () => {
        const articles = [...this.state.articles]
        const newArticles = articles.sort((a,b) => (a.votes > b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0))
        this.setState({
            articles: newArticles,
            columnReverse: !this.state.columnReverse
        })
    }

    SortByCreated = () => {
        const articles = [...this.state.articles]
        const newArticles = articles.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        this.setState({
            articles: newArticles,
            columnReverse: !this.state.columnReverse
        })
    }

    SortByComments = () => {
        const articles = [...this.state.articles]
        const newArticles = articles.sort((a,b) => (a.comments < b.comments) ? 1 : ((b.comments < a.comments) ? -1 : 0))
        this.setState({
            articles: newArticles,
            columnReverse: !this.state.columnReverse
        })
    }

    showAddArticle = () => {
        this.setState({
            addArticle: !this.state.addArticle
        })
    }

    addNewArticle = (article) => {
        const newArticle = [article, ...this.state.articles]
        this.setState({
            articles: newArticle,
            addArticle: false
        })
    }

    componentDidMount() {
        api.getAllArticles()
        .then(articles => {
            this.setState({
                articles: articles.articles,
                loading: false
            })
        })
        .catch(err => console.log(err))
    }
}

export default AllArticles;