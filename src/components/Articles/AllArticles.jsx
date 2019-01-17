import React, { Component } from 'react';
import './AllArticles.css'
import * as api from '../../api'
import { Link } from "@reach/router"
import Loading from '../Loading/Loading';
import AddArticle from './AddArticle'
import moment from 'moment'
const sortItems = ['Votes', 'Created', 'Comments']

class AllArticles extends Component {

    state = {
        articles: [],
        loading: true,
        columnReverse: false,
        addArticle: false,
        message: false
    }

    render() {
        const toggleReverse = !this.state.columnReverse ? 'column' : 'column-reverse'
        const style = {
            flexDirection: toggleReverse
        }

        if (this.state.loading) return <Loading />
        else return (
            <div>
                <div className="AllArticlesSelection">
                    <div
                        onClick={this.showAddArticle}
                        className="AddNewArticle">
                    </div>
                    <ul>
                        {sortItems.map(listItem => {
                            return (
                                <div key={listItem} className="SortItems">
                                    <li onClick={(e) => this.sortBy(listItem.toLowerCase())}></li>
                                    <h2>{listItem}</h2>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                {this.state.message && <h2 className="AddedWarning">*** New Article Added ***</h2>}
                {
                    this.state.addArticle && !this.props.user.user &&
                    <div className="LoginWarning">
                        <h2>In order to add an article, please login <Link to="/login" className="Here">HERE</Link>...</h2>
                    </div>

                }
                {this.state.addArticle && this.props.user.user &&
                    <AddArticle
                        user={this.props.user}
                        addNewArticle={this.addNewArticle} />}
                <div style={style} className="AllArticles">
                    {this.state.articles.map(article => {
                        return (
                            <div key={article._id}>
                                <Link to={`/articles/${article._id}`}>
                                    <div className="Article">
                                        <h1>{article.title}</h1>
                                        <p>{article.body.substr(0, 100) + '...'}</p>
                                        <div className="articleStats">
                                            <h3>Comment Count: {article.comments}</h3>
                                            <h3>Votes: {article.votes}</h3>
                                            <h3>Created: {moment(article.created_at).fromNow()}</h3>
                                        </div>
                                        <hr className="ArticleHR" />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    sortBy = value => {
        const articles = [...this.state.articles]
        const newArticles = value === 'created' ? articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) :
            articles.sort((a, b) => a[value] - b[value])
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
            addArticle: false,
            message: true
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