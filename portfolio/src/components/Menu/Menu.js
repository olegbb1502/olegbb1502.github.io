import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import SocialBlock from "../SocialBlock/SocialBlock";
import './Menu.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Menu extends Component {

    render(){
        return(
            <div className="menu">
                <ul>
                    <li><NavLink exact to='/' activeClassName='active'>HOME</NavLink></li>
                    <li><NavLink to='/about' activeClassName='active'>ABOUT ME</NavLink></li>
                    <li><NavLink to='/port' activeClassName='active'>PORTFOLIO</NavLink></li>
                    <li><NavLink to='/cont' activeClassName='active'>CONTACTS</NavLink></li>
                </ul>
                <SocialBlock/>
            </div>
        );
    }
}

export default Menu