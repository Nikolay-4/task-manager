import React, { Component } from 'react';

export default class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.taskDesc
        };
    }

    handleOnChangeName(ev) {
        this.setState({
            taskName: ev.target.value
        });
    }

    handleOnChangeDesc(ev) {
        this.setState({
            taskDesc: ev.target.value
        });
    }

    handleSave() {
        this.props.handleSave(this.state);
    }

    render() {
        return (
            <div>
                <input value={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
                <input value={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
                <button onClick={this.handleSave.bind(this)}>save</button>
            </div>
        );
    }
}