import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import logo from './logo.svg';
import './App.css';


class EditForm extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskName: this.props.taskName,
			taskDesc: this.props.taskDesc
		};
	}
	handleOnChangeName(ev){
		this.setState({
			taskName: ev.target.value
		});
	}
	handleOnChangeDesc(ev){
		this.setState({
			taskDesc: ev.target.value
		});
	}
	handleSave() {
		this.props.handleSave(this.state);

	}
	render(){
		return (
			<div>
				<input value={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
				<input value={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
				<button onClick={this.handleSave.bind(this)}>save</button>
			</div>
		);
	}
}

class Task extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskName: this.props.taskName,
			taskDesc: this.props.desc,
			editable: false
		}
	}
	render(){
		var editForm = false;
		if(this.state.editable)
			editForm = <EditForm taskName={this.state.taskName} taskDesc={this.state.taskDesc} handleSave={(data) => {this.handleSave(data);}}/>;
		return (
			<div className="task">
				<div className="name">
					{this.state.taskName}
				</div>
				<div className="description">
					{this.state.taskDesc}
				</div>
				<button onClick={() => {this.handleClick();}}> edit </button>
				{editForm}
			</div>
		);
	}
	handleClick(){
		this.setState({
			editable: true
		});
	}
	handleSave(data){
		this.setState({
			taskName: data.taskName,
			taskDesc: data.taskDesc,
			editable: false
		});
		
	}
}



class TaskList extends Component{ 
	render() {
		return (	
			<div className="taskList">
				<Task taskName="Task 1" desc="desc1"/>
				<Task taskName="Task 2" desc="desc2" />
			</div>
		);
	}
}

class Board extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskListArr: [{}]
		};

	}
	render(){

	}

}

class App extends Component{ 
	render() {
		return (
			<div className="app">
				<TaskList />
			</div>
		);
	}
}

export default App;
