import React, {Component} from 'react';
import TaskList from './TaskList.js';
import AddTaskList from './AddTaskList.js';
import AddTask from './AddTask.js';

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


    handleOnChangeTask(data) {

        let currentTaskListArray = this.state.taskListArray;
        let listNameArray = currentTaskListArray.map((item) => {
            return item.listName
        });

        let indexCurrentList = listNameArray.indexOf(data.currentList);
        let indexSelectList = listNameArray.indexOf(data.selectedList);
        if ((indexCurrentList === -1) || (indexSelectList === -1)) return;

        let indexTask = currentTaskListArray[indexCurrentList].tasks.map((item) => {
            return item.id
        }).indexOf(data.id);
        if (indexTask === -1) return;

        let task = currentTaskListArray[indexCurrentList].tasks[indexTask];
        task.taskName = data.taskName;
        task.taskDesc = data.taskDesc;

        if (data.currentList !== data.selectedList) {
            currentTaskListArray[indexCurrentList].tasks.splice(indexTask, 1);
            currentTaskListArray[indexSelectList].tasks.push(task);
        }

        this.setState({
            taskListArray: currentTaskListArray
        });
        console.log("------", currentTaskListArray);
    }

    handleOnAddList(listName) {
        console.log(listName);
        let newTaskListArray = this.state.taskListArray;

        newTaskListArray.push({
            listName: listName,
            tasks: []
        });

        this.setState({
            taskListArray: newTaskListArray
        });
    }

    handleOnAddTask(newTask) {
        console.log(newTask);
        let currentTaskListArray = this.state.taskListArray;
        let listNameArray = currentTaskListArray.map((item) => {
            return item.listName
        });
        let indexList = listNameArray.indexOf(newTask.selectedList);

        if (indexList === -1) return;

        currentTaskListArray[indexList].tasks.push({
            taskName: newTask.taskName,
            taskDesc: newTask.taskDesc
        });

        this.setState({
            taskListArray: currentTaskListArray
        });
    }

    render() {

        let nameListArray = this.state.taskListArray.map(item => item.listName);

        // Todo: У тебя ID у тасков каждый раз при рендере меняются?
        let listArray = this.state.taskListArray.map(item => {
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
                    nameListArray={nameListArray}
                    handleOnChangeTask={this.handleOnChangeTask.bind(this)}
                />
            );
        });

        return (
            <div>
                <div className="board">
                    {listArray}
                </div>
                <AddTask nameListArray={nameListArray} handleOnAddTask={this.handleOnAddTask.bind(this)}/>
                <AddTaskList nameListArray={nameListArray} handleOnAddList={this.handleOnAddList.bind(this)}/>
            </div>
        );
    }
}
