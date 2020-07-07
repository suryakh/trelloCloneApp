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
                <div className="row">
                    {this.state.titleEdit ? <div><input name="listTitle" value={this.state.listTitle} onChange={this.handleChange} /> <button onClick={() => this.editListTitle()}>save</button><button onClick={() => this.changeEditMode()} >close</button></div> : <div className="col-9">
                        <h5 onClick={() => this.changeEditMode()}>{this.props.data.title}</h5>

                    </div>}
                    <div></div>
                    <div className="col-3"><button onClick={() => this.props.deleteList(this.props.data.id)}>Delete</button></div>

                </div>
                <div>
                    {this.props.data.items.map((ele) => <div className="col-12">
                        <div data-toggle="modal" data-target={`#modal${ele.id}`}>{ele.title} </div><button onClick={() => this.props.deleteItem(ele.id, this.props.data.id)}>delete</button>
                        <div className="modal fade" id={`modal${ele.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <Item data={ele} listId={this.props.data.id} />
                        </div>
                    </div>)}
                </div>
                {this.state.addItemStatus ? <button onClick={() => this.addItemStatus()}>Add Item</button> : <div>
                    <input type="text" name="itemTitle" value={this.state.itemTitle} onChange={this.handleChange} />
                    <button onClick={() => this.addnewItem()}>add</button><button onClick={() => this.addItemStatus()}>Close</button>
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
        addItem: (listId, itemTitle) => dispatch(addItem(listId, itemTitle)),
        deleteList: (listId) => dispatch(deleteList(listId)),
        deleteItem: (itemId, listId) => dispatch(deleteItem(itemId, listId)),
        editListTitle: (listId, listTitle) => dispatch(editListTitle(listId, listTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itemlist)
