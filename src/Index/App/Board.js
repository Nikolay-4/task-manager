import React, { Component } from 'react';
import TaskList from './TaskList.js';

var task1 = {
	taskName: "A",
	taskDesc: "desc1"
}

var task2 = {
	taskName: "B",
	taskDesc: "desc2"
}

var task3 = {
	taskName: "C",
	taskDesc: "desc3"
}

var task4 = {
	taskName: "D",
	taskDesc: "desc4"
}
var testList = [
	{
		listName: "list1",
		tasks: [task1, task2]
	},
	{
		listName: "list2",
		tasks: [task3, task4]
	},
	{
		listName: "list3",
		tasks: [Object.assign({}, task1), Object.assign({}, task2), Object.assign({}, task3), Object.assign({}, task4)]
	}
];
		var nextTaskId = 1;

export default class Board extends Component {
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
			var tasks = item.tasks.map((item) => {
				item.id = nextTaskId++;
				return item;
			});
			console.log(tasks)
			return <TaskList listName={item.listName} key={item.listName} tasks={tasks} nameListArr={nameListArr} changeState={this.changeState.bind(this)}/>
		});
		return(
			<div className="board">
				{listArr}
			</div>
		);
	}
}