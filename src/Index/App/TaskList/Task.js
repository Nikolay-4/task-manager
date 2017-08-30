import React, {Component} from 'react';
import EditTask from './EditTask';
import PropTypes from 'prop-types';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.desc,
            editable: false
        }
    }

    render() {
        let editTask = false;
        if (this.state.editable)
            editTask = <EditTask
                id={this.props.id}
                taskName={this.state.taskName}
                taskDesc={this.state.taskDesc}
                currentList={this.props.currentList}
                nameListArray={this.props.nameListArray}
                handleOnChangeTask={this.props.handleOnChangeTask}
            />;
        return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <div className="row">
                        <p className="col-sm-9">{this.state.taskName}</p>
                        <button className="col-sm-1 btn btn-sm btn-link" onClick={() => {this.handleOnEdit()}}>
                            <span className="glyphicon glyphicon-edit"> </span>
                        </button>

                        <button className="col-sm-1 btn btn-sm btn-link" onClick={() =>{this.handleOnDelete()}}>
                            <span className="glyphicon glyphicon-remove-circle"></span>
                        </button>
                    </div>
                </div>
                <div className="panel-body">
                    <span className="">{this.state.taskDesc}</span>
                </div>
                {editTask}
            </div>
        );
    }

    handleOnDelete(){
        this.props.handleOnDeleteTask(this.props.id, this.props.currentList);
    }

    handleOnEdit() {
        this.setState({
            editable: true
        });
    }
}

Task.propTypes = {
    taskName: PropTypes.string,
    desc: PropTypes.string,
    currentList: PropTypes.string.isRequired,
    nameListArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleOnChangeTask: PropTypes.func.isRequired,
    handleOnDeleteTask: PropTypes.func.isRequired
};