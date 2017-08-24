import React, { Component } from 'react';

export default class AddTaskList extends Component {
	/*
		props: 
		nameListArr - имена всех листов дел
		addListCallback(listName) - callback функция 

	*/
	constructor(props) {
		super(props);
		this.state = {
			listName: "Name"
		}
	}
	handleChangeListName(ev){
		this.setState({
			listName: ev.target.value
		});
	}
	handleAddBtn(){
		if(this.props.nameListArr.indexOf(this.state.listName) !== -1){
			alert("this name already exist");
			return;
		}
		this.props.addListCallback(this.state.listName);
	}
	render(){
		return(
			<div className="addListName">
				<h4>Add new task list</h4>
				<input value={this.state.listName} onChange={this.handleChangeListName.bind(this)}/>
				<button onClick={this.handleAddBtn.bind(this)}>Add</button>
			</div>
		);
	}
}