import React from 'react';
import { Link } from '@reach/router'
import './Navbar.css'

const Navbar = ({ open, changeBurgerMenu, user }) => {
    return (
        <div className='Navbar'>
            <Link className="HomeLink" to="/"><h1 className="ComicNews">ComicNews</h1></Link>
            <div className="UserProfile">
                { user.user && 
                <div className="NavbarUserDetails">
                    <img src={user.user.avatar_url} alt="User"/>
                    <h1 className="NavbarUsername">{ user.user.username }</h1> 
                </div>}
            </div>
            <div className="TopicsChoice">
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