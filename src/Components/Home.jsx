import React, { Component } from 'react'
import { connect } from 'react-redux'
import Add_List from './Add_List'
import { addListStatus } from '../Redux/Actions'
import Task_List from './Task_List'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNewlist: false
        }
    }
    handleClick = () => {
        this.setState({
            addNewlist: !this.state.addNewlist
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-primary text-center">
                        <h1>Trello</h1>
                    </div>
                </div>
                <div className="row">
                    {this.props.appData.mainData.map((ele) => <div className="col-3"><Task_List data={ele} /></div>)}
                    <div className="col-3">
                        {this.props.appData.addListStatus ? <Add_List /> : <div className=" col-12 border m-1" onClick={() => this.props.addListStatus()}>add new list</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    appData: state.appReducer
})

const mapDispatchToProps = dispatch => {
    return {
        addListStatus: () => dispatch(addListStatus())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
