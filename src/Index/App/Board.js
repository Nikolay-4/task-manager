import React, { Component } from 'react';
import TaskList from './TaskList.js';
import AddTaskList from './AddTaskList.js';
import AddTask from './AddTask.js';

// Todo: Используй let и const вместо var
let task1 = {
	taskName: "A",
	taskDesc: "desc1"
};

let task2 = {
	taskName: "B",
	taskDesc: "desc2"
};

let task3 = {
	taskName: "C",
	taskDesc: "desc3"
};

let task4 = {
	taskName: "D",
	taskDesc: "desc4"
};

let testList = [
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

let NEXT_TASK_ID = 0;

export default class Board extends Component {
    constructor(props) {
		super(props);
		this.state = {
			taskListArray: testList
		};
	}

	// Todo: для callback функций используй следующий шаблон наименования 'handleOnДействие'
	// Например: handleOnChangeTask или handleOnCloseWindow.
	// Так по названию функции будет понятно, что это бработчик события и что он используется где-то в компоненте
	changeTask(data){
		// Todo: Испольуй полные нащвания переменных.
		// let curTaskListArr = this.state.taskListArr;
        let currentTaskListArray = this.state.taskListArray;
        let listNameArr =  currentTaskListArray.map((item) => {return item.listName});

		// Todo: Пиши полные называния переменных.
		let indexCurrentList = listNameArr.indexOf(data.currentList);
		let indexSelectList = listNameArr.indexOf(data.selectedList);
		if((indexCurrentList === -1) || (indexSelectList === -1)) return;

		let indexTask = currentTaskListArray[indexCurrentList].tasks.map((item) => {return item.id}).indexOf(data.id);
		if(indexTask === -1) return;

		let task = currentTaskListArray[indexCurrentList].tasks[indexTask];
		task.taskName = data.taskName;
		task.taskDesc = data.taskDesc;

		if(data.currentList !== data.selectedList){
			currentTaskListArray[indexCurrentList].tasks.splice(indexTask, 1);
			currentTaskListArray[indexSelectList].tasks.push(task);
		}

		this.setState({
			taskListArray: currentTaskListArray
		});
		console.log("------", currentTaskListArray);
	}

	addList(listName){
		console.log(listName);
		let newTaskListArr = this.state.taskListArray;

		newTaskListArr.push({
			listName: listName,
			tasks: []
		});

		this.setState({
			taskListArray: newTaskListArr
		});
	}

	addTask(newTask){
		console.log(newTask);
		let curTaskListArr = this.state.taskListArray;
		let listNameArr =  curTaskListArr.map((item) => {return item.listName});
		let iList = listNameArr.indexOf(newTask.selectedList);

		// Todo: Условия такого типа с return или continue на конце пишутся без скобок в одну строчку
		// if(iList === -1)
        //	return;
        if (iList === -1) return;

		curTaskListArr[iList].tasks.push({
			taskName: newTask.taskName,
			taskDesc: newTask.taskDesc
		});

		this.setState({
			taskListArray: curTaskListArr
		});
	}

	render() {
		// Todo: Если ты не используешь параметры функции, то не стоит их писать
		// let nameListArr = this.state.taskListArray.map((item, i, arr) => {

        let nameListArr = this.state.taskListArray.map(item => item.listName);

        // Todo: У тебя ID у тасков каждый раз при рендере меняются?
		let listArr = this.state.taskListArray.map(item => {
			let tasks = item.tasks.map(item => {
				item.id = NEXT_TASK_ID++;
                console.log(`Item ${item.name} has id = ${item.id}`);
                return item;
			});

			console.log(tasks);
			return (
				<TaskList
					listName={item.listName}
					key={item.listName}
					tasks={tasks}
					nameListArr={nameListArr}
					changeState={this.changeTask.bind(this)}
				/>
			);
		});

		return(
			<div>
				<div className="board">
					{listArr}
				</div>
				<AddTask nameListArr={nameListArr} addTaskCallback={this.addTask.bind(this)}/>
				<AddTaskList nameListArr={nameListArr} addListCallback={this.addList.bind(this)}/>
			</div>
		);
	}
}

// Todo: Это глобальная переменная или константа. По этому она быть написана большими буквами и вынесена наверх
// let nextTaskId = 0;