import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDescription, editItemTitle } from '../Redux/Actions'

export class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleEdit: false,
            itemTitle: this.props.data.title,
            updateState: true,
            edit: false,
            itemDescription: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    changeEditMode = () => {
        this.setState({
            titleEdit: !this.state.titleEdit
        })
    }
    handleClick = () => {
        let temp = {
            itemId: this.props.data.id,
            listId: this.props.listId,
            itemDes: this.state.itemDescription
        }
        // console.log(this.state)
        this.props.addDescription(temp)
        this.setState({
            // updateState: !this.state.updateState,
            edit: false
        })
    }

    editItemTitle = () => {
        this.setState({
            titleEdit: false
        })
        let temp = {
            itemId: this.props.data.id,
            listId: this.props.listId,
            itemTitle: this.state.itemTitle
        }
        this.props.editItemTitle(temp)
    }

    render() {
        console.log(this.props.data)
        return (
            <>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="row">
                                <div className="col-12"><p>Item:</p></div>
                                {this.state.titleEdit ? <div className="col-12"><input name="itemTitle" value={this.state.itemTitle} onChange={this.handleChange} /> <button onClick={() => this.editItemTitle()}>save</button><button onClick={() => this.changeEditMode()} >close</button></div> : 
                                <div className="col-12">
                                    <h5 onClick={() => this.changeEditMode()}>{this.props.data.title}</h5>
                                </div>}
                                <div></div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.edit ? <div className="col-12">
                                <p>Item Description</p>
                                <textarea className="col-12" type="textarea" name="itemDescription" onChange={this.handleChange} value={this.state.itemDescription} />
                                <button onClick={() => this.handleClick()}>save</button>
                            </div> : <div>
                                    {this.props.data.description ?
                                        <div className="col-12">
                                            <div className="row p-2">
                                            <p>Item Description</p>
                                            <button onClick={() => this.setState({ edit: true })}>edit</button>
                                            </div>
                                            <div className=" row p-2" style={{height:"100px",backgroundColor:"#eaecf0"}}>
                                            <p>{this.props.data.description}</p> 
                                            </div>
                                             </div> : 
                                             <div>
                                            <p>add description </p>
                                            <textarea className="col-12" type="textarea" name="itemDescription" onChange={this.handleChange} value={this.state.itemDescription} />
                                            <button onClick={() => this.handleClick()}>save</button>
                                            </div>
                                    }
                                </div>}

                        </div>
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
        addDescription: (itemDesc) => dispatch(addDescription(itemDesc)),
        editItemTitle: (itemTitle) => dispatch(editItemTitle(itemTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
