import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, deleteList,deleteTask } from '../Redux/Actions'

export class Tasklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleEdit: false,
            title: this.props.data.title,
            taskTitle: "",
            addTaskStatus: true
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    changeEditMode = () => {
        this.setState({
            titleEdit: true
        })
    }
    addTaskStatus = () => {
        this.setState({
            addTaskStatus: !this.state.addTaskStatus
        })
    }
    addnewTask = () => {
        this.setState({
            addTaskStatus: !this.state.addTaskStatus
        })
        this.props.addItem(this.props.data.id, this.state.taskTitle)
    }
    render() {
        console.log(this.state)
        return (
            <>
                <div className="row">
                    {this.state.titleEdit ? <input name="title" value={this.state.title} onChange={this.handleChange} /> : <div className="col-9 text-center">
                        <h5 onClick={() => this.changeEditMode()}>{this.props.data.title}</h5>
                    </div>}
                    <div></div>
                    <div className="col-3"><button onClick={() => this.props.deleteList(this.props.data.id)}>Delete</button></div>

                </div>
                <div>
                    {this.props.data.items.map((ele) => <div className="col-12">
                        <div>{ele.title} <button onClick={()=>this.props.deleteTask(ele.id,this.props.data.id)}>delete</button></div>
                    </div>)}
                </div>
                {this.state.addTaskStatus ? <button onClick={() => this.addTaskStatus()}>Add Task</button> : <div>
                    <input type="text" name="taskTitle" value={this.state.taskTitle} onChange={this.handleChange} />
                    <button onClick={() => this.addnewTask()}>add</button>
                </div>}

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    appData: state.appReducer

})

const mapDispatchToProps = dispatch => {
    return {
        addItem: (listId, taskTitle) => dispatch(addItem(listId, taskTitle)),
        deleteList: (listId) => dispatch(deleteList(listId)),
        deleteTask:(taskId,listId) =>dispatch(deleteTask(taskId,listId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist)
