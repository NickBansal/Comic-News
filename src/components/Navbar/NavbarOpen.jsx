import React from 'react';
import { Link } from '@reach/router';
import './NavbarOpen.css'

const NavbarOpen = ({ topics, changeTopic }) => {
    return (
        <div className="Menu">
            <ul>
                {topics.map(item => {
                    return <Link key={item._id} to={`/topic/${item.slug}/articles`}>
                    <li onClick={() => changeTopic(item.title)}>{item.title}</li>
                    </Link>
                })}
            </ul>
        </div>
    )
}

export default NavbarOpen;


// onClick={close}