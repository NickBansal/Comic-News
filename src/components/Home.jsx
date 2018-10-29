import React from 'react';
import './Home.css'

const Home = () => {
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
                    {/* <div className="television__channels-wrapper">
                        <ul className="television__channels">
                            <li className="television__channel"><a href="https://www.youtube.com/embed/SRu6YRr1KtM" title="Channel 1"></a></li>
                            <li className="television__channel"><a href="https://www.youtube.com/embed/oRdxUFDoQe0" title="Channel 2"></a></li>
                            <li className="television__channel"><a href="https://www.youtube.com/embed/EGikhmjTSZI" title="Channel 3"></a></li>
                            <li className="television__channel"><a href="https://www.youtube.com/embed/06qJVpUSKZY" title="Channel 4"></a></li>
                            <li className="television__channel"><a href="https://www.youtube.com/embed/v_09wFxoaeQ" title="Channel 5"></a></li>
                            <li className="television__channel"><a href="https://www.youtube.com/embed/Tj75Arhq5ho" title="Channel 6"></a></li>
                        </ul>
                    </div> */}
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