import React, {Component} from 'react';

import './RightBar.css';
import Menu from "../Menu/Menu";

class RightBar extends Component {
    constructor () {
        super()
        this.state = {
            isHidden: true
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    render(){
        return(
            <div className="right-bar">
                <a onClick={this.toggleHidden.bind(this)} className='clickToMenu'>
                    <span>Click</span>
                </a>
                {!this.state.isHidden && <Menu />}
            </div>
        );
    }
}

export default RightBar