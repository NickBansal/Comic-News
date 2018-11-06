import React from 'react';
import { Link } from '@reach/router';
import './NavbarOpen.css'

const NavbarOpen = ({ 
    topics, changeTopic, showTopics, changeBurgerMenu, fullTopics }) => {
        const arrow = !fullTopics ? <i class="fas fa-angle-down"></i> : <i class="fas fa-angle-up"></i>
    return (
        <div className="Menu">
            <ul>
                <Link to="/users"><li 
                className="TopicItemsNotFull" 
                onClick={changeBurgerMenu}>Users</li></Link>
                <li
                className="TopicItemsNotFull" 
                onClick={showTopics}>Topics   {arrow}</li>

                {fullTopics && topics.map(item => {
                    return <Link key={item._id} to={`/topic/${item.slug}/articles`}>
                    <li 
                    className="TopicItemsInFull"
                    onClick={() => changeTopic(item.title)}>{item.title}</li>
                    </Link>
                })}
            </ul>
        </div>
    )
}

export default NavbarOpen;