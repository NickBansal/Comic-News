import React from 'react';
import { Link } from '@reach/router'
import './UserArticles.css'

const UserArticles = ({ articles }) => {
    return (
        <div className="FullUserArticles">
            {articles.map(article => {
                return (
                <div className="SingleUserArticleDiv" key={article._id}>
                    <Link to={`/articles/${article._id}`}><h2 className="SingleUserArticle" >{article.title}</h2></Link>
                    <h3 className="SingleUserArticle" >Created: {article.created_at.split('T')[0]}</h3>
                </div>
                )
            })}
        </div>
    )
}

export default UserArticles

