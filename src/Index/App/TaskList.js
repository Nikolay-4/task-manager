import React, { Component } from 'react';
import Task from './TaskList/Task';

export default class TaskList extends Component {
    render() {
        return (
            <div className='taskList'>
                <Task taskName='Task 1' desc='desc1'/>
                <Task taskName='Task 2' desc='desc2' />
            </div>
        );
    }
}