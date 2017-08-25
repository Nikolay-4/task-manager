import React, { Component } from 'react';
import Task from './TaskList/Task';

export default class TaskList extends Component {
    render() {
		let tasks = this.props.tasks.map((item, i, arr) => {
			return <Task id={item.id} key={item.id} taskName={item.taskName} desc={item.taskDesc} nameListArr={this.props.nameListArr} currentList={this.props.listName} changeState={this.props.onSave}/>
		})
		return (	
			<div className="taskList">
				<h4> {this.props.listName}</h4>
				{tasks}
			</div>
		);
	}
}