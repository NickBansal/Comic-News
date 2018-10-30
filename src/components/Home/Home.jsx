import React, { Component } from 'react';
import Articles from '../Articles/Articles'
import SingleArticle from '../Articles/SingleArticle'
import { Router } from '@reach/router'
import * as api from '../../api'
import './Home.css'

class Home extends Component {

    state = {
        articles: [],
        singleArticle: [],
        article_id: '',
        showSingleArticles: false
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
                        
                        { this.props.switch && !this.props.chosenTopic && 
                        <h1>Please select a topic</h1>}
                        
                        <Router>
                            { this.props.switch && <Articles 
                            changeSingleArticle={this.changeSingleArticle}
                            articles={this.state.articles}
                            path="/topic/:topic/articles"/> }

                            {this.props.switch && this.state.showSingleArticles && <SingleArticle
                            singleArticle={this.state.singleArticle} 
                            path="/topic/:topic/articles/:article_id"
                            /> }
                        </Router>

                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <li className="television__channel votes"></li>
                                <h2>Votes</h2>
                                <li className="television__channel created"></li>
                                <h2>Created</h2>
                                <li className="television__channel comments"></li>
                                <h2>Most Comments</h2>
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


    componentDidUpdate(prevProps, prevState) {
		console.log('Articles update....');
		if (prevProps.chosenTopic !== this.props.chosenTopic) {
            api.getArticleByTopic(this.props.chosenTopic)
            .then(articles => {
                this.setState({
                    articles
                })
            })
        }
        if (prevState.showSingleArticles !== this.state.showSingleArticles) {
            api.getArticleById(this.state.article_id)
            .then(singleArticle => {
                this.setState({
                    singleArticle
                })
            })
        }
    }

    changeSingleArticle = (article_id) => {
        this.setState({
            showSingleArticles: !this.state.showSingleArticles,
            article_id
        })
    }
}

export default Home; 