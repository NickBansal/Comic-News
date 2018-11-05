import React from 'react';
import { Link } from '@reach/router';
import './NavbarOpen.css'

const NavbarOpen = ({ 
    topics, changeTopic, showTopics, changeBurgerMenu, fullTopics }) => {
    return (
        <div className="Menu">
            <ul>
                <li onClick={showTopics}>Topics</li>

                {fullTopics && topics.map(item => {
                    return <Link key={item._id} to={`/topic/${item.slug}/articles`}>
                    <li 
                    className="TopicItemsInFull"
                    onClick={() => changeTopic(item.title)}>{item.title}</li>
                    </Link>
                })}
                <Link to="/users"><li onClick={changeBurgerMenu}>Users</li></Link>
            </ul>
        </div>
    )
}

export default NavbarOpen;