import React, { Component } from 'react';
import Articles from '../Articles/Articles'
import SingleArticle from '../Articles/SingleArticle'
import Login from '../Login/Login'
import { Router, Link } from '@reach/router'
import * as api from '../../api'
import './Home.css'
import NotFound from '../Notfound'

class Home extends Component {

    state = {
        articles: [],
        loading: true,
        userName: '',
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
                            <div>
                                <h1>Please select a Topic...</h1>
                            </div>
                        }

                        { this.props.switch && this.state.login &&
                        <div>
                            <Router>
                                <Login 
                                clearStorage={this.clearStorage}
                                changeArticles={this.state.articles}
                                changeTopic={this.props.changeTopic}
                                changeUsersName={this.changeUsersName}
                                path="/login"/>
                            </Router>
                        </div> 
                        }


                        { this.props.switch && this.state.articles.length > 0 && 
                        
                        <Router>
                            <Articles 
                            userName={this.state.userName}
                            articles={this.state.articles}
                            path="/topic/:topic/articles"/> 

                            <SingleArticle
                            userName={this.state.userName}
                            path="/articles/:article_id/*" />

                            <NotFound default/>

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
            login: true
        })
    }

    changeUsersName = userName => {
        this.setState({
            userName
        })
    }

    clearStorage = () => {
        localStorage.clear()
    }

    componentDidMount() {
        this.setState({
            userName: JSON.parse(localStorage.getItem('userName'))
        })
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
        if (prevState.userName !== this.state.userName ) {
            localStorage.setItem('userName', JSON.stringify(this.state.userName))
        }
    }
}

export default Home; 