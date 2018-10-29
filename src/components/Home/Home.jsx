import React from 'react';
import './Home.css'

const Home = () => {
    let forwards = '>'
    let backwards = '<'
    return (
        <div>
            <div className="television">
                <div className="television__top">
                    <div className="television__antenna television__antenna--left"></div>
                    <div className="television__antenna television__antenna--right"></div>
                    <div className="television__antenna__base"></div>
                </div> 
                <div className="television__center">
                    <div className="television__screen">
                        
                    </div>
                    <div className="television__channels-wrapper">
                        <ul className="television__channels">
                            <li className="television__channel">{backwards}</li>
                            <li className="television__channel">{forwards}</li>
                            
                        </ul>
                    </div>
                    <div className="switch">
                    <button>SWITCH</button>
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

export default Home; 