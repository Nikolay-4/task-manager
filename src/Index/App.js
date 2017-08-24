import './Svg/logo.svg';
import './App/Css/App.css';

import React, { Component } from 'react';
import Board from './App/Board.js';

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Board />
            </div>
        );
    }
}