import React, { Component } from 'react';
import TopicArticles from '../Articles/TopicArticles'
import SingleArticle from '../Articles/SingleArticle'
import AllArticles from '../Articles/AllArticles'
import Users from '../Users/Users'
import SingleUser from '../Users/SingleUser'
import Navbar from '../Navbar/Navbar'
import NavbarOpen from '../Navbar/NavbarOpen'
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
        user: {},
        open: false,
        chosenTopic: '',
        fullTopics: false
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
                <Navbar 
                user={this.state.user}
                open={this.state.open} 
                changeBurgerMenu={this.changeBurgerMenu}/>
        
                {this.state.open && 
                <NavbarOpen 
                fullTopics={this.state.fullTopics}
                changeBurgerMenu={this.changeBurgerMenu}
                showTopics={this.showTopics}
                topics={this.props.topics}
                changeTopic={this.changeTopic}/>}

                <div style={this.state.open ? inStyle : outStyle} className="television">
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
                                <AllArticles 
                                user={this.state.user}
                                path="/articles"/>
                                <TopicArticles 
                                username={this.state.user.username}
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
                                <Users 
                                path="/users/" />
                                <SingleUser path="/users/:username"/>
                                <NotFound default/>
                            </Router>
                        }

                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <Link onClick={this.changeLogin} to="/login"><li className="television__channel votes"><h2 className="Short" >Login</h2></li></Link>
                                <h2 className="Long" >Login</h2>
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

    showTopics = () => {
        this.setState({
            fullTopics: !this.state.fullTopics
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

    changeBurgerMenu = () => {
        this.setState({
          open: !this.state.open,
          fullTopics: false
        })
    }

    changeTopic = (event) => {
        let chosenTopic = event.toLowerCase()
        this.setState({
          chosenTopic,
          open: false,
          fullTopics: false
        })
      }

    componentDidUpdate(prevProps, prevState) {
		if (prevState.chosenTopic !== this.state.chosenTopic) {
            api.getArticleByTopic(this.state.chosenTopic)
            .then(articles => {
                this.setState({
                    articles
                })
            })
        }
        if (prevState.user !== this.state.user) {
            this.state.user ?
            localStorage.setItem('user', JSON.stringify(this.state.user)) :
            localStorage.removeItem('user')
        } 
    }
}

export default Home; 