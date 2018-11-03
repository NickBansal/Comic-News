import React, { Component } from 'react';
import TopicArticles from '../Articles/TopicArticles'
import SingleArticle from '../Articles/SingleArticle'
import AllArticles from '../Articles/AllArticles'
import HomePage from './HomePage'
import Login from '../Login/Login'
import { Router, Link } from '@reach/router'
import * as api from '../../api'
import './Home.css'
import NotFound from '../Notfound'

class Home extends Component {

    state = {
        articles: [],
        loading: true,
        user: {}
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
                        
                        { this.props.switch &&
                            <Router>
                                <HomePage path="/" />
                                <AllArticles path="/articles"/>
                                <TopicArticles 
                                userName={this.state.user.username}
                                articles={this.state.articles}
                                path="/topic/:topic/articles"/> 
                                <SingleArticle
                                user={this.state.user}
                                path="/articles/:article_id/*" />
                                <Login 
                                logOut={this.logOut}
                                setUser={this.setUser}
                                user={this.state.user}
                                path="/login"/>
                                <NotFound default/>
                            </Router>
                        }

                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <Link onClick={this.changeLogin} to="/login"><li className="television__channel votes"><h2 className="Short" >User</h2></li></Link>
                                <h2 className="Long" >UserPage</h2>
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