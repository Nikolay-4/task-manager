import React, {Component} from 'react';
import Task from './TaskList/Task';
import PropTypes from 'prop-types';

export default class TaskList extends Component {

    handleOnDelete(){
        this.props.handleOnDeleteTaskList(this.props.listName);
    }

    render() {
        let tasks = this.props.tasks.map((item, i, arr) => {
            return <Task
                id={item.id}
                key={item.id}
                taskName={item.taskName}
                desc={item.taskDesc}
                nameListArray={this.props.nameListArray}
                currentList={this.props.listName}
                handleOnChangeTask={this.props.handleOnChangeTask}
                handleOnDeleteTask={this.props.handleOnDeleteTask}
            />

        });
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <h4 className="col-sm-10 text-center"> {this.props.listName}</h4>
                        <button className="col-sm-1 btn btn-link" onClick={() => this.handleOnDelete()}>
                            <span className="glyphicon glyphicon-remove-circle"></span>
                        </button>
                    </div>
                </div>
                {tasks}
            </div>
        );
    }
}

TaskList.propTypes = {
    nameListArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    listName: PropTypes.string.isRequired,
    handleOnChangeTask: PropTypes.func.isRequired,
    handleOnDeleteTaskList: PropTypes.func.isRequired
};