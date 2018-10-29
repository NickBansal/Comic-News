import React, { Component } from 'react';
import Articles from '../Articles/Articles'
import * as api from '../../api'
import './Home.css'

class Home extends Component {

    state = {
        articles: []
    }

    render () {
        console.log('Articles rendering...')
        let forwards = '>'
        let backwards = '<'
        let openText = this.props.switch ? 'OFF' : 'ON'
        
        const inStyle = {
            filter: 'blur(10px) grayscale(50%)',
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
                            { this.props.switch && !this.props.chosenTopic && <h1>Please select a topic</h1>}
                            { this.props.switch && this.props.chosenTopic && <Articles articles={this.state.articles }/> }
                        </div>
                        <div className="television__channels-wrapper">
                            <ul className="television__channels">
                                <li className="television__channel">{backwards}</li>
                                <li className="television__channel">{forwards}</li>
                                
                            </ul>
                        </div>
                        <div className="switch">
                        <button onClick={this.props.switchTelevision}>{openText}</button>
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


    componentDidUpdate(prevProps) {
		console.log('Articles update....');
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