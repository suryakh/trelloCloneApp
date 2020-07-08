import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, deleteList, deleteItem, editListTitle, dropItem } from '../Redux/Actions'
import Item from './Item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faTrashAlt, faAlignLeft,faTimes } from '@fortawesome/free-solid-svg-icons'

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

    // enable and desable edit mode for listTitle
    changeEditMode = () => {
        this.setState({
            titleEdit: !this.state.titleEdit
        })
    }
    // Trigger addItem button
    addItemStatus = () => {
        this.setState({
            addItemStatus: !this.state.addItemStatus
        })
    }
    // Adding new Item to the List
    addnewItem = () => {
        if(/\S/.test(this.state.itemTitle)){
        this.setState({
            addItemStatus: !this.state.addItemStatus
        })
        this.props.addItem(this.props.data.id, this.state.itemTitle)
        this.setState({
            itemTitle:""
        })
    }
    else {
        alert("please enter title")
    }
    }
    //  dispatch action for edit listTitle
    editListTitle = () => {
        this.setState({
            titleEdit: false
        })
        this.props.editListTitle(this.props.data.id, this.state.listTitle)
    }

    // Drag and Drop logic

    onDragOver = (e) => {
        e.preventDefault()
    }
    onDragStart = (e, data) => {
        data['dragId'] = this.props.data.id
        let dragItem = JSON.stringify(data)
        e.dataTransfer.setData('data', dragItem)
    }
    onDrop = (e) => {
        let data = JSON.parse(e.dataTransfer.getData('data'))
        if (this.props.data.id !== data.dragId) {
            this.props.dropItem(data, this.props.data.id)
        }
    }


    render() {
        return (
            <>
                <div className="row m-1">
                    <div className="col-12 p-3 listDiv">

                        {/* Edit Or Delete List */}

                        {this.state.titleEdit ?
                            <div className="row m-1">
                                <input className="col-8" name="listTitle" value={this.state.listTitle} onChange={this.handleChange} />
                                <button className="btn btn-success" onClick={() => this.editListTitle()}>save</button>
                                <div style={{ cursor: "pointer" }} className="ml-3 mt-2" onClick={() => this.changeEditMode()} ><FontAwesomeIcon style={{ color: "red" }} icon={faTimes} size="lg" /></div>
                            </div> :
                            <div className="row">
                                <h5 className="col-11" onClick={() => this.changeEditMode()}>{this.props.data.title}</h5>
                                <div style={{ cursor: "pointer" }} onClick={() => this.props.deleteList(this.props.data.id)}><FontAwesomeIcon icon={faTrash} size="xs" /></div>
                            </div>}

                            {/* Displaying Items  */}

                        <div style={{ minHeight: "25px",padding:"20px 10px" }} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
                            {this.props.data.items.map((ele) => 
                                <div onDragStart={(e) => this.onDragStart(e, ele)} className="col-12" draggable>
                                <div className="row shadow mt-3 p-2">
                                    <div className='col-11' style={{ cursor: "pointer" }} data-toggle="modal" data-target={`#modal${ele.id}`}>{ele.title} </div><div style={{ cursor: "pointer" }} onClick={() => this.props.deleteItem(ele.id, this.props.data.id)}><FontAwesomeIcon icon={faTrashAlt} size="xs" /></div>
                                    {ele.description && <div className='col-9'><FontAwesomeIcon icon={faAlignLeft} /></div>}
                                </div>

                                <div className="modal fade" id={`modal${ele.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <Item data={ele} listId={this.props.data.id} />
                                </div>

                            </div>)}
                        </div>

                        {/* Adding new Item */}

                        {this.state.addItemStatus ? <div className="row m-2" style={{ cursor: "pointer" }} onClick={() => this.addItemStatus()}> <p><FontAwesomeIcon icon={faPlus} /> Add Item </p></div> : <div className="row m-2">
                            <input placeholder="Enter item title" className="col-8" type="text" name="itemTitle" value={this.state.itemTitle} onChange={this.handleChange} />
                            <button className="btn btn-success" onClick={() => this.addnewItem()}>add</button><div className="ml-3 mt-2" style={{ cursor: "pointer" }} onClick={() => this.addItemStatus()}><FontAwesomeIcon style={{ color: "red" }} icon={faTimes} size="lg" /></div>
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
        editListTitle: (listId, listTitle) => dispatch(editListTitle(listId, listTitle)),
        dropItem: (data, dropId) => dispatch(dropItem(data, dropId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itemlist)
