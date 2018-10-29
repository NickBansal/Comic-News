import React from 'react'
import './Articles.css'

const Articles = ({ articles }) => {
    
    return (
        <div>
            {articles.map(article => {
                return (
                    <div className="Article" key={article._id}>
                        <h1>{article.title}</h1>
                        <p>{article.body.substr(0,100) + '...'}</p>
                        <hr />
                    </div>
                    
                )
            })}
        </div>
    )
}

export default Articles