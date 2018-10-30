import React from 'react'
// import { Link } from '@reach/router'
import './Articles.css'

const Articles = ({ articles, changeSingleArticle }) => {
    
    return (
        <div>
            {articles.map(article => {
                return (
                    <div 
                    onClick={(event) => changeSingleArticle(article._id)} 
                    className="Article" 
                    key={article._id}>
                        <h1>{article.title}</h1>
                        <p>{article.body.substr(0,100) + '...'}</p>
                        <div className="articleStats">
                            <h3>Comment Count: {article.comment_count}</h3>
                            <h3>Votes: {article.votes}</h3>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Articles