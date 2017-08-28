import React, {Component} from 'react';
import AddTask from "./AddTask";
import PropTypes from 'prop-types'

export default class AddTaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listName: "Name"
        }
    }

    handleChangeListName(ev) {
        this.setState({
            listName: ev.target.value
        });
    }

    handleAddBtn() {
        if (this.props.nameListArray.indexOf(this.state.listName) !== -1) {
            alert("this name already exist");
            return;
        }
        this.props.handleOnAddList(this.state.listName);
    }

    render() {
        return (
            <div className="addListName">
                <h4>Add new task list</h4>
                <input value={this.state.listName} onChange={this.handleChangeListName.bind(this)}/>
                <button onClick={this.handleAddBtn.bind(this)}>Add</button>
            </div>
        );
    }
}
AddTask.propTypes = {
    nameListArray: PropTypes.arrayOf(PropTypes.string),
    handleOnAddList: PropTypes.func
}