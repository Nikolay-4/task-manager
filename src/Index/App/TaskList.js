import React, {Component} from 'react';
import Task from './TaskList/Task';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
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
            />
        });
        return (
            <div className="taskList">
                <h4> {this.props.listName}</h4>
                {tasks}
            </div>
        );
    }
}

TaskList.propTypes = {
    nameListArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    listName: PropTypes.string.isRequired,
    handleOnChangeTask: PropTypes.func.isRequired
};