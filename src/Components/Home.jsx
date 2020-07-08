import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Lists from './Lists'
import AddList from './AddList'
import { addListStatus } from '../Redux/Actions'


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
                        {this.props.appData.addListStatus ? <AddList /> : <div className=" col-12 border addListDiv m-1 p-2" style={{ cursor: "pointer" }} onClick={() => this.props.addListStatus()}><FontAwesomeIcon icon={faPlus} /> add new list</div>}
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
