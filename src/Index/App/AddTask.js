import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
				{/*
					Todo: Почему тут id стоит null? Он используется где-то ещё?
					Если да, то ты можешь наверное не указывать его или сделать равным нулю.
				 */}
				<EditForm
					id={null}
					taskName="Enter name"
					taskDesc="Enter description"
					nameListArr={this.props.nameListArr}
					currentList={this.props.nameListArr[0]}
					onSave={this.props.onSave}
				/>
			</div>
		);
	}
}

AddTask.propTypes = {
	id: PropTypes.number,
    onSave: PropTypes.func.isRequired
};
