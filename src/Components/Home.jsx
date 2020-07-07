import React, { Component } from 'react'
import { connect } from 'react-redux'
import Add_List from './Add_List'
import {addListStatus} from '../Redux/Actions'

export class Home extends Component {
    constructor (props){
        super(props)
        this.state={
            addNewlist:false
        }
    }
    handleClick=()=>{
        this.setState({
            addNewlist:!this.state.addNewlist
        })
    }
    render() {
        console.log(this.props.data)
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-primary text-center">
                        <h1>Trello</h1>
                    </div>
                </div>
                <div className="row">
                    {this.props.data.addListStatus ?<Add_List /> : <button className="btn btn-primary" onClick={()=>this.props.addListStatus()}>add</button>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.appReducer
})

const mapDispatchToProps = dispatch => {
    return {
        addListStatus:()=>dispatch(addListStatus())
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
