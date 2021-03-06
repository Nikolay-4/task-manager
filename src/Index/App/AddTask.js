import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditTask from './TaskList/EditTask';

export default class AddTask extends Component {

    render() {
        return (
            <div className="panel panel-default addTask">
                <div className="panel-heading">
                    <h4>Add task</h4>
                </div>
                <div className="panel-body">
                    <EditTask
                        taskName="Enter name"
                        taskDesc="Enter description"
                        nameListArray={this.props.nameListArray}
                        currentList={this.props.nameListArray[0]}
                        handleOnChangeTask={this.props.handleOnAddTask}
                    />
                </div>
            </div>
        );
    }
}

AddTask.propTypes = {
    nameListArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleOnAddTask: PropTypes.func.isRequired
};
