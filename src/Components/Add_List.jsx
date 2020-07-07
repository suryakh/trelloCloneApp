import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addListStatus} from '../Redux/Actions'

export class Add_List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listTitle: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            listTitle: e.target.value
        })
    }
    addList = (data) => {
        console.log(data)
    }
    render() {
        console.log(this.state)
        return (
            <div className="col-12">
                <input value={this.state.listTitle} onChange={this.handleChange} />
                <button onClick={() => this.props.addNewList(this.state.listTitle)}>Add List</button><button onClick={() => this.props.addListStatus()}>Close</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return {
        addListStatus: () => dispatch(addListStatus()),
        addNewList:(listTitle)=>dispatch(addNewList(listTitle))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Add_List)