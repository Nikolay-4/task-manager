import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: this.props.taskName,
            taskDesc: this.props.taskDesc,
            selectedList: this.props.currentList
        };
    }

    handleOnChangeName(e) {
        this.setState({
            taskName: e.target.value
        });
    }

    handleOnChangeDesc(e) {
        this.setState({
            taskDesc: e.target.value
        });
    }

    handleOnChangeList(e) {
        this.setState({
            selectedList: e.target.value
        });
    }

    handleOnSave() {
        this.props.handleOnChangeTask({
            id: this.props.id,
            currentList: this.props.currentList,
            taskName: this.state.taskName,
            taskDesc: this.state.taskDesc,
            selectedList: this.state.selectedList
        });
    }

    render() {
        return (
            <div>
                <input value={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
                <input value={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
                <select onChange={this.handleOnChangeList.bind(this)} defaultValue={this.props.currentList}>
                    {this.props.nameListArray.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <button onClick={() => this.handleOnSave()}>save</button>
            </div>
        );
    }
}

EditTask.propTypes = {
    id: PropTypes.number,
    taskName: PropTypes.string,
    nameListArray: PropTypes.arrayOf(PropTypes.string),
    currentList: PropTypes.string,
    handleOnChangeTask: PropTypes.func
};
