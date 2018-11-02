import React from 'react';
import { Link } from '@reach/router'
import './HomePage.css'

const HomePage = () => {
    return (
        <div className="HomePage">
            <h1>COMIC NEWS</h1>
            <button><Link to="/articles"><h1>Show all articles</h1></Link></button>
        </div>
    )
}

export default HomePage;