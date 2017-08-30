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
        let testListWithId = testList.map((item) =>
        {
            let tasks = item.tasks.map(item => {
                item.id = NEXT_TASK_ID++;
                console.log(`Item ${item.taskName} has id = ${item.id}`);
                return item;
            });
            item.tasks = tasks;
            return item;
        });
        super(props);
        this.state = {
            taskListArray: testListWithId
        };
    }

    handleOnSaveData(){
        let serialObj = JSON.stringify( this.state.taskListArray);
        localStorage.setItem("taskListArray", serialObj);
        localStorage.setItem("nextId", NEXT_TASK_ID);
        alert("saved");
    }

    handleOnLoadData(){
        let serialObj = localStorage.getItem("taskListArray");
        NEXT_TASK_ID = +localStorage.getItem("nextId");
        let taskListArray = JSON.parse(serialObj);
        console.log("loaded:", taskListArray);
        if(!Array.isArray(taskListArray)) {
            alert("load error");
            return;
        }
        this.setState({
            taskListArray: taskListArray
        });
        alert("loaded");
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
        task.id = NEXT_TASK_ID++;
        console.log("new Task", task);
        if (data.currentList !== data.selectedList) {
            currentTaskListArray[indexCurrentList].tasks.splice(indexTask, 1);
            currentTaskListArray[indexSelectList].tasks.push(task);
        }

        // currentTaskListArray[indexCurrentList].tasks[indexTask] = {taskName: data.taskName, taskDesc: data.taskDesc, id: data.id};

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
            taskDesc: newTask.taskDesc,
            id: NEXT_TASK_ID++
        });

        this.setState({
            taskListArray: currentTaskListArray
        });
    }

    handleOnDeleteTask(taskId, currentList){
        let currentTaskListArray = this.state.taskListArray;
        let listNameArray = currentTaskListArray.map((item) => {
            return item.listName
        });
        let indexList = listNameArray.indexOf(currentList);

        if (indexList === -1) return;

        let indexTask = currentTaskListArray[indexList].tasks.map((item) => item.id).indexOf(taskId);
        if (indexTask === -1) return;

        currentTaskListArray[indexList].tasks.splice(indexTask, 1);
        this.setState({
            taskListArray: currentTaskListArray
        });
    }

    handleOnDeleteTaskList(currentList){
        if(currentList === undefined) return;
        let currentTaskListArray = this.state.taskListArray;
        let listNameArray = currentTaskListArray.map((item) => {
            return item.listName
        });
        let indexList = listNameArray.indexOf(currentList);
        console.log("-----------------", indexList);
        console.log("-----------------", currentList);
        /*let confirmResult = true;
        if(currentTaskListArray[indexList].length > 0)
            confirmResult = confirm("Task list is not empty. Do you really want to delete all tasks?");
        if(!confirmResult) return;*/
        currentTaskListArray.splice(indexList, 1);
        this.setState({
            taskListArray: currentTaskListArray
        });
    }

    render() {
        let nameListArray = this.state.taskListArray.map(item => item.listName);

        let listArray = this.state.taskListArray.map(item => {
            return (
                <div className="col-md-3" key={item.listName}>
                    <TaskList
                        listName={item.listName}
                        key={item.listName}
                        tasks={item.tasks}
                        nameListArray={nameListArray}
                        handleOnChangeTask={this.handleOnChangeTask.bind(this)}
                        handleOnDeleteTask={this.handleOnDeleteTask.bind(this)}
                        handleOnDeleteTaskList={this.handleOnDeleteTaskList.bind(this)}
                    />
                </div>
            );
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        {listArray}
                    </div>
                    <div className="col-md-2 well right-menu">
                        <div className="panel panel-default">
                            <AddTask nameListArray={nameListArray} handleOnAddTask={this.handleOnAddTask.bind(this)}/>
                        </div>
                        <AddTaskList nameListArray={nameListArray} handleOnAddList={this.handleOnAddList.bind(this)}/>

                        <div className="btn-group btn-group-justified boardControl">
                            <div className="btn-group">
                                <button className="btn btn-primary" onClick={() => this.handleOnSaveData()}>save</button>
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-primary" onClick={() => this.handleOnLoadData()}>load</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
