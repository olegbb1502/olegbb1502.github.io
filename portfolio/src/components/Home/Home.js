import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div className="home">
                <h2>Hi, I am Oleg</h2>
                <h1>Full - stack developer</h1>
                <Link to='/port'>MY PORTFOLIO</Link>
            </div>
        );
    }
}

export default Home