import React, { Component } from 'react';

export default class EditForm extends Component {
    /*
        props:
        currentList
        taskName
        taskDesk
        id
        nameListArr
        changeState({id, currentList, taskName, taskDesc, selectedList})
    */
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.taskDesc,
            selectedList: this.props.currentList
        };
    }
    handleOnChangeName(ev){
        this.setState({
            taskName: ev.target.value
        });
    }
    handleOnChangeDesc(ev){
        this.setState({
            taskDesc: ev.target.value
        });
    }
    handleOnChangeList(ev){
        this.setState({
            selectedList: ev.target.value
        });
    }
    handleSave() {
        this.props.changeState({
            id: this.props.id, 
            currentList: this.props.currentList,
            taskName: this.state.taskName,
            taskDesc: this.state.taskDesc,
            selectedList: this.state.selectedList
        });
    }
    render(){
        var options = this.props.nameListArr.map((item, i, arr) => {
            return <option key={item} value={item}>{item} </option>
        });
        return (
            <div>
                <input value={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
                <input value={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
                <select onChange={this.handleOnChangeList.bind(this)} defaultValue={this.props.currentList}>
                    {options}
                </select>
                <button onClick={this.handleSave.bind(this)}>save</button>
            </div>
        );
    }
}