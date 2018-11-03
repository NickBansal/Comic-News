import React from 'react';
import './DeleteComment.css';
// import * as api from '../../api';


const DeleteComment = ({ id, deletedComment }) => {
    return (
        <div className="DeleteButton">
            <button onClick={() => deletedComment(id)}> DELETE </button>
        </div>
    )
}

export default DeleteComment