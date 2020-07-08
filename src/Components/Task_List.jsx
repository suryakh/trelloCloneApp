import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, deleteList, deleteItem, editListTitle } from '../Redux/Actions'
import Item from './Item'

export class Itemlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleEdit: false,
            listTitle: this.props.data.title,
            itemTitle: "",
            addItemStatus: true
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
    addItemStatus = () => {
        this.setState({
            addItemStatus: !this.state.addItemStatus
        })
    }
    addnewItem = () => {
        this.setState({
            addItemStatus: !this.state.addItemStatus
        })
        this.props.addItem(this.props.data.id, this.state.itemTitle)
    }
    editListTitle = () => {
        this.setState({
            titleEdit: false
        })
        this.props.editListTitle(this.props.data.id, this.state.listTitle)
    }
    render() {
        console.log(this.state)
        return (
            <>
                <div className="row m-1">
                    <div className="col-12 p-3 listDiv">
                        {this.state.titleEdit ?
                            <div className="row m-1">
                                <input className="col-9" name="listTitle" value={this.state.listTitle} onChange={this.handleChange} />
                                <button onClick={() => this.editListTitle()}>save</button>
                                <button className="float-right" onClick={() => this.changeEditMode()} >X</button>
                            </div>
                            :
                            <div className="row">
                                <h5 className="col-9" onClick={() => this.changeEditMode()}>{this.props.data.title}</h5>
                                <button onClick={() => this.props.deleteList(this.props.data.id)}>Delete</button>
                            </div>}
                        <div>
                            {this.props.data.items.map((ele) => <div className="col-12 ">
                                <div className="row shadow mt-3">
                                    <div className='col-9' style={{cursor:"pointer"}} data-toggle="modal" data-target={`#modal${ele.id}`}>{ele.title} </div><button onClick={() => this.props.deleteItem(ele.id, this.props.data.id)}>delete</button>
                                   {ele.description && <div className='col-9'>fahsdg</div>}
                                </div>


                                <div className="modal fade" id={`modal${ele.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <Item data={ele} listId={this.props.data.id} />
                                </div>
                            </div>)}
                        </div>
                        {this.state.addItemStatus ? <div className="row m-2" style={{ cursor: "pointer" }} onClick={() => this.addItemStatus()}>Add Item</div> : <div className="row m-2">
                            <input className="col-8" type="text" name="itemTitle" value={this.state.itemTitle} onChange={this.handleChange} />
                            <button onClick={() => this.addnewItem()}>add</button><button onClick={() => this.addItemStatus()}>X</button>
                        </div>}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    appData: state.appReducer

})

const mapDispatchToProps = dispatch => {
    return {
        addItem: (listId, itemTitle) => dispatch(addItem(listId, itemTitle)),
        deleteList: (listId) => dispatch(deleteList(listId)),
        deleteItem: (itemId, listId) => dispatch(deleteItem(itemId, listId)),
        editListTitle: (listId, listTitle) => dispatch(editListTitle(listId, listTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itemlist)
