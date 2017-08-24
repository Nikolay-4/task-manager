import './Svg/logo.svg';
import './App/Css/App.css';

import React, { Component } from 'react';
import TaskList from './App/TaskList';

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <TaskList />
            </div>
        );
    }
}