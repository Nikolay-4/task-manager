import React, { Component } from 'react';
import EditForm from './EditForm';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.desc,
            editable: false
        }
    }
    render(){
        let editForm = false;
        if(this.state.editable)
            editForm = <EditForm id ={this.props.id} taskName={this.state.taskName} taskDesc={this.state.taskDesc} currentList={this.props.currentList} nameListArr={this.props.nameListArr} changeState={this.props.onSave}/>;
        return (
            <div className="task">
                <div className="name">
                    {this.state.taskName}
                </div>
                <div className="description">
                    {this.state.taskDesc}
                </div>
                <button onClick={() => {this.handleClick();}}> edit </button>
                {editForm}
            </div>
        );
    }
    handleClick(){
        this.setState({
            editable: true
        });
    }
}