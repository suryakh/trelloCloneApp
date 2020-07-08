import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addListStatus, addNewList } from '../Redux/Actions'

export class AddList extends Component {
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
            <>
                <div className=" row listDiv p-2 m-1">
                    <div className="col-12">
                        <input className="col-12" value={this.state.listTitle} onChange={this.handleChange} />
                    </div>
                    <div className="col-12 m-2">
                        <button className="btn btn-success"  onClick={() => this.props.addNewList(this.state.listTitle)}>Add List</button><button className="btn btn-danger" onClick={() => this.props.addListStatus()}>Close</button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return {
        addListStatus: () => dispatch(addListStatus()),
        addNewList: (listTitle) => dispatch(addNewList(listTitle))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddList)
