import React, { Component } from 'react';
import EditForm from './TaskList/EditForm';

export default class AddTask extends Component {
/*
	props:
	nameListArr
	addTaskCallback
	id - task id
*/
	render(){
		return(
			<div className="addTask">
				<h4>Add task</h4>
				<EditForm 
				taskName="Enter name" 
				taskDesc="Enter description"
				nameListArr={this.props.nameListArr}
				currentList={this.props.nameListArr[0]}
				id={null}
				changeState={this.props.addTaskCallback}
				  />
			</div>
		);
	}
}