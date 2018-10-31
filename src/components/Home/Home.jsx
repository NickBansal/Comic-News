import React, { Component } from 'react';
import Articles from '../Articles/Articles'
import SingleArticle from '../Articles/SingleArticle'
import Login from '../Login/Login'
import { Router, Link } from '@reach/router'
import * as api from '../../api'
import './Home.css'

class Home extends Component {

    state = {
        articles: [],
        loading: true
    }

    render () {
        let openText = this.props.switch ? 'OFF' : 'ON'
        const openTextStyle = {
            fontFamily: '\'Patrick Hand\', cursive'
        }
        const inStyle = {
            filter: 'blur(15px) grayscale(70%)',
            transition: '1s',
        }
        const outStyle = {
            transition: '1s'
        }
        const teleOn = {
            background: '#eed5b6'
        }

        return (
            <div>
                <div style={this.props.open ? inStyle : outStyle} className="television">
                    <div className="television__top">
                        <div className="television__antenna television__antenna--left"></div>
                        <div className="television__antenna television__antenna--right"></div>
                        <div className="television__antenna__base"></div>
                    </div> 
                    <div className="television__center">
                        <div style={ this.props.switch ? teleOn : null } className="television__screen">
                        

                        { this.props.switch && this.state.articles.length < 1 && 
                        <div>
                            <h1>Please Login OR select a Topic...</h1> 
                            <Router>
                                <Login path="/login"/>
                            </Router>
                        </div> }


                        { this.props.switch && this.state.articles.length > 0 && 
                        
                        <Router>
                            <Articles 
                            articles={this.state.articles}
                            path="/topic/:topic/articles"/> 

                            <SingleArticle
                            path="/articles/:article_id/*" />

                        </Router> }

                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <Link onClick={this.changeLogin} to="/login"><li className="television__channel votes"></li></Link>
                                <h2>Login</h2>
                                <li className="television__channel created"></li>
                                <h2>Votes</h2>
                                <li className="television__channel comments"></li>
                                <h2>Created</h2>
                            </ul>
                        </div>
                        <div className="switch">
                        <button style={openTextStyle} onClick={this.props.switchTelevision}>{openText}</button>
                        </div>
                        </div>
                        
                        <div className="television__base">
                            <div className="television__foot television__foot--left"></div>
                            <div className="television__foot television__foot--right"></div>
                        </div>
                    </div>
                </div>
        )
    }

    changeLogin = () => {
        this.setState({
            articles: []
        })
    }


    componentDidUpdate(prevProps) {
		if (prevProps.chosenTopic !== this.props.chosenTopic) {
            api.getArticleByTopic(this.props.chosenTopic)
            .then(articles => {
                this.setState({
                    articles
                })
            })
        }
    }
}

export default Home; 