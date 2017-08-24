import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import logo from './logo.svg';
import './App.css';

var task1 = {
	id: 1,
	taskName: "task1",
	taskDesc: "desc1"
}

var task2 = {
	id: 2,
	taskName: "task2",
	taskDesc: "desc2"
}

var testList = [
	{
		listName: "list1",
		tasks: [task1, task2]
	},
	{
		listName: "list2",
		tasks: [task1, task2]
	}
];

class EditForm extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskName: this.props.taskName,
			taskDesc: this.props.taskDesc,
			selectedList: this.props.currentList
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
	handleOnChangeList(ev){
		this.setState({
			selectedList: ev.target.value
		});
	}
	handleSave() {
		this.props.changeState({
			id: this.props.id, 
			currentList: this.props.currentList,
			taskName: this.state.taskName,
			taskDesc: this.state.taskDesc,
			selectedList: this.state.selectedList
		});
	}
	render(){
		var options = this.props.nameListArr.map((item, i, arr) => {
			if(item === this.props.currentList)
				return <option selected value={item}>{item} </option>
			else 
				return <option value={item}>{item} </option>
		});
		return (
			<div>
				<input value={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
				<input value={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
				<select onChange={this.handleOnChangeList.bind(this)}>
					{options}
				</select>
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
			editForm = <EditForm id ={this.props.id} taskName={this.state.taskName} taskDesc={this.state.taskDesc} currentList={this.props.currentList} nameListArr={this.props.nameListArr} changeState={this.props.changeState}/>;
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
	
}



class TaskList extends Component{ 
	render() {
		var tasks = this.props.tasks.map((item, i, arr) => {
			return <Task id={item.id} taskName={item.taskName} desc={item.taskDesc} nameListArr={this.props.nameListArr} currentList={this.props.listName} changeState={this.props.changeState}/>
		})
		return (	
			<div className="taskList">\
				<h4> {this.props.listName}</h4>
				{tasks}
			</div>
		);
	}
}

class Board extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskListArr: testList
		};
	}
	changeState(data){
		var curTaskListArr = this.state.taskListArr;
		var listNameArr =  curTaskListArr.map((item) => {return item.listName});
		var iCurList = listNameArr.indexOf(data.currentList);
		var iSelectList = listNameArr.indexOf(data.selectedList);
		console.log(curTaskListArr);
		console.log(data)
		console.log(listNameArr)
		console.log()
		console.log("icurlist " + iCurList);
		if(iCurList === -1)
			return;
		var iTask = curTaskListArr[iCurList].tasks.map((item) => {return item.id}).indexOf(data.id);
		console.log("itask "+iTask);
		if(iTask === -1)
			return;
		var task = curTaskListArr[iCurList].tasks[iTask];
		task.taskName = data.taskName;
		task.taskDesc = data.taskDesc;

		if(data.currentList !== data.selectedList){
			curTaskListArr[iCurList].tasks.splice(iTask, 1);
			curTaskListArr[iSelectList].tasks.push(task);
		}
		this.setState({
			taskListArr: curTaskListArr
		});
	}
	render(){

		var nameListArr = this.state.taskListArr.map((item, i, arr) => {
			return item.listName;
		});
		var listArr = this.state.taskListArr.map ((item, i, arr) => {
			return <TaskList listName={item.listName} tasks={item.tasks} nameListArr={nameListArr} changeState={this.changeState.bind(this)}/>
		});
		return(
			<div className="board">
				{listArr}
			</div>
		);
	}

}

class App extends Component{ 
	render() {
		return (
			<div className="app">
				<Board />
			</div>
		);
	}
}

export default App;
