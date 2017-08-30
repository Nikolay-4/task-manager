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
        console.log("start", this);
    }

    componentWillReceiveProps(nextProps){
        console.log("will receive props:", nextProps);
        this.setState({
            selectedList: nextProps.currentList
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
        console.log("edit task state", this.state);
    }

    render() {
        return (
            <div className="well well-sm editTask">
                <input className="form-control" placeholder={this.state.taskName} onChange={this.handleOnChangeName.bind(this)}/>
                <input className="form-control" placeholder={this.state.taskDesc} onChange={this.handleOnChangeDesc.bind(this)}/>
                <select className="form-control" onChange={this.handleOnChangeList.bind(this)} defaultValue={this.state.selectedList}>
                    {this.props.nameListArray.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <button className="btn btn-success" onClick={() => this.handleOnSave()}>save</button>
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
