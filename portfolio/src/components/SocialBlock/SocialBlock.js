import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'react-fa';
import './SocialBlock.css';

class SocialBlock extends Component {
    render(){
        return(
            <div className="social">
                <ul>
                    <li><a href='mailto:bolobanoleg@gmail.com' className='social' target="_blank"><Icon name="envelope" /></a></li>
                    <li><a href='https://t.me/Oleg_Boloban' className='social' target="_blank"><Icon name="telegram" /></a></li>
                    <li><a href='https://github.com/olegbb1502' className='social' target="_blank"><Icon name="github" /></a></li>
                    <li><a href='https://www.linkedin.com/in/oleg-boloban-b394b4151/' className='social' target="_blank"><Icon name="linkedin" /></a></li>
                </ul>
            </div>
        );
    }
}

export default SocialBlock;