import React, { Component } from 'react';
import TopicArticles from '../Articles/TopicArticles'
import SingleArticle from '../Articles/SingleArticle'
import AllArticles from '../Articles/AllArticles'
import HomePage from './HomePage'
import Login from '../Login/Login'
import { Router, Link } from '@reach/router'
import * as api from '../../api'
import './Home.css'
// import NotFound from '../Notfound'

class Home extends Component {

    state = {
        articles: [],
        loading: true,
        user: {},
        login: false
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
                        
                        { this.props.switch && !this.state.login && this.state.articles.length < 1 && 
                            <Router>
                                <HomePage path="/" />
                                <AllArticles path="/articles"/>
                            </Router>
                        }

                        { this.props.switch && this.state.login &&
                        <div>
                            <Router>
                                <Login 
                                logOut={this.logOut}
                                changeArticles={this.state.articles}
                                changeTopic={this.props.changeTopic}
                                setUser={this.setUser}
                                user={this.state.user}
                                path="/login"/>
                            </Router>
                        </div> 
                        }


                        { this.props.switch && this.state.articles.length > 0 && 
                        
                        <Router>

                            <TopicArticles 
                            userName={this.state.user.username}
                            articles={this.state.articles}
                            path="/topic/:topic/articles"/> 

                            <SingleArticle
                            user={this.state.user}
                            path="/articles/:article_id/*" />

                            {/* <NotFound default/> */}

                        </Router> }

                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <Link onClick={this.changeLogin} to="/login"><li className="television__channel votes"></li></Link>
                                <h2>UserPage</h2>
                                <li 
                                onClick={() => console.log('HELLO')}
                                className="television__channel created"></li>
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
            login: true
        })
    }

    setUser = user => {
        this.setState({
            user
        })
    }

    logOut= () => {
        this.setState({
            user: {}
        })
    }

    componentDidMount() {
        const userVariable = localStorage.getItem('user'); 
        if (userVariable) {
            this.setState({
                user: JSON.parse(userVariable)
            })
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.chosenTopic !== this.props.chosenTopic) {
            api.getArticleByTopic(this.props.chosenTopic)
            .then(articles => {
                this.setState({
                    articles
                })
            })
        }
        if (prevState.user.username !== this.state.user.username) {
            this.state.user.username ?
            localStorage.setItem('user', JSON.stringify(this.state.user)) :
            localStorage.removeItem('user')
        } 
    }
}

export default Home; 