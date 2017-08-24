import React, { Component } from 'react';
import EditForm from './EditForm';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.desc,
            editable: false
        };
    }

    handleClick() {
        this.setState({
            editable: true
        });
    }

    handleSave(data) {
        this.setState({
            taskName: data.taskName,
            taskDesc: data.taskDesc,
            editable: false
        });
    }

    render() {
        var editForm = false;
        if (this.state.editable) {editForm = <EditForm taskName={this.state.taskName} taskDesc={this.state.taskDesc} handleSave={(data) => {this.handleSave(data);}}/>;}
        return (
            <div className='task'>
                <div className='name'>
                    {this.state.taskName}
                </div>
                <div className='description'>
                    {this.state.taskDesc}
                </div>
                <button onClick={() => {this.handleClick();}}> edit </button>
                {editForm}
            </div>
        );
    }
}