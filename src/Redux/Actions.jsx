import { CHANGE_ADD_LIST_STATUS, ADD_NEW_LIST, ADD_NEW_ITEM, DELETE_LIST,DELETE_TASK } from './ActionTypes'

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
const deleteTask = (taskId, listId) => {
    return {

        type: DELETE_TASK,
        payload: {
            taskId: taskId,
            listId: listId
        }
    }
}

export { addListStatus, addNewList, addItem, deleteList,deleteTask }