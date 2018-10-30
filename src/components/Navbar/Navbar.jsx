import React from 'react';
import './Navbar.css'

const Navbar = ({ open, changeBurgerMenu }) => {
    return (
        <div className='Navbar'>
            <h1>ComicNews</h1>
            <div className="TopicsChoice">
                <h1>Topics >>></h1>
            <div 
            className={open ? "burger-menu open" : "burger-menu"}
            onClick={changeBurgerMenu}>
                <div className="bar1" key="b1" />
                <div className="bar2" key="b2" />
                <div className="bar3" key="b3" />
            </div>
            </div>
            
        </div>
    )
}

export default Navbar;