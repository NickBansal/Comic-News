import React from 'react';
import './UserComments.css'

const UserComments = ({ comments }) => {
    return (
        <div className="FullComments">
            {comments.map(comment => {
                return (
                    <div className="EachComment" key={comment._id}>
                        <div className="BelongsTo">
                            <h2>Article: {comment.belongs_to.title}</h2>
                        </div>
                        <div className="Comment">
                            <p>{comment.body}</p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default UserComments;