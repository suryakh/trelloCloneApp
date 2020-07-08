import React, { Component } from 'react'
import { connect } from 'react-redux'
import Add_List from './Add_List'
import { addListStatus } from '../Redux/Actions'
import Lists from './Lists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


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
                <div className="row mb-3">
                    <div className="col-12 navBar text-center">
                        <h1>TrelloClone</h1>
                    </div>
                </div>
                <div className="mainDiv">
                    {this.props.appData.mainData.map((ele) => <div><Lists data={ele} /></div>)}
                    <div >
                        {this.props.appData.addListStatus ? <Add_List /> : <div className=" col-12 border addListDiv m-1 p-2" style={{cursor:"pointer"}} onClick={() => this.props.addListStatus()}><FontAwesomeIcon icon={faPlus} /> add new list</div>}
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
