import { CHANGE_ADD_LIST_STATUS, ADD_NEW_LIST, ADD_NEW_ITEM, DELETE_LIST,DELETE_ITEM,EDIT_LIST_TITLE,ADD_DESCRIPTION,EDIT_ITEM_TITLE,DROP_ITEM } from './ActionTypes'

const addListStatus = () => {
    return {
        type: CHANGE_ADD_LIST_STATUS
    }
}
const genRandomNumber = () => {
    let num = Math.floor(Math.random() * 100)
    return num
}
const addNewList = (title) => {
    return {
        type: ADD_NEW_LIST,
        payload: {
            id: genRandomNumber(),
            title: title
        }
    }
}
const deleteList = (listId) => {
    return {
        type: DELETE_LIST,
        payload: {
            id: listId
        }
    }
}
const addItem = (id, taskTitle) => {
    return {
        type: ADD_NEW_ITEM,
        payload: {
            listId: id,
            id: genRandomNumber(),
            title: taskTitle
        }
    }
}
const deleteItem = (taskId, listId) => {
    return {

        type: DELETE_ITEM,
        payload: {
            taskId: taskId,
            listId: listId
        }
    }
}
const editListTitle =(listId,listTitle)=>{
    console.log(listId,listTitle)
    return{
        type:EDIT_LIST_TITLE,
        payload:{
            listId:listId,
            listTitle:listTitle
        }
    }
}
const addDescription =(taskDesc)=>{
return {
    type:ADD_DESCRIPTION,
    payload:taskDesc
}
}
const editItemTitle = (itemData)=>{
    return {
        type:EDIT_ITEM_TITLE,
        payload:itemData
    }
}
const dropItem =(data,id)=>{
    return {
        type:DROP_ITEM,
        payload:{
            droppedId:id,
            itemData:data
        }
    }    

}
export { addListStatus, addNewList, addItem, deleteList,deleteItem,editListTitle,addDescription,editItemTitle ,dropItem}