import React from 'react'
import { Link } from '@reach/router'
import './Articles.css'

const TopicArticles = ({ articles }) => {
    
    return (
        <div>
            {articles.map(article => {
                return (
                    <Link key={article._id} to={`/articles/${article._id}`}>
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
                )
            })}
        </div>
    )
}

export default TopicArticles