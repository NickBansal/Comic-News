import React from 'react';
import './NavbarOpen.css'

const NavbarOpen = ({ topics, changeTopic }) => {
    return (
        <div className="Menu">
            <ul>
                {topics.sort().map(item => {
                    return <li onClick={() => changeTopic(item.title)} key={item._id}>{item.title}</li>
                })}
            </ul>
        </div>
    )
}

export default NavbarOpen;


// onClick={close}