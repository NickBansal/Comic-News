import React, { Component } from 'react';
import './AllArticles.css'
import * as api from '../../api'
import { Link } from "@reach/router"
import _ from 'lodash'

class AllArticles extends Component {

    state = {
        articles: [],
        loading: true
    }

    render () {
        console.log(this.state.articles.articles)
        if (this.state.loading) return (
            <div>
                <h1>Loading</h1>
            </div>
        )
        else return (
            <div>
                <div>
                    {this.state.articles.articles.map(article => {
                    return (
                        <div key={article._id}>
                            <Link to={`/articles/${article._id}`}>
                            <div className="Article">
                                <h1>{article.title}</h1>
                                <p>{article.body.substr(0,100) + '...'}</p>
                                <div className="articleStats">
                                    <h3>Comment Count: {article.comment_count}</h3>
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

    componentDidMount() {
        api.getAllArticles()
        .then(articles => {
            this.setState({
                articles,
                loading: false
            })
        })
        .catch(err => console.log(err))
    }
}

export default AllArticles;