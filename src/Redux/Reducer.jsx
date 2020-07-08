import { CHANGE_ADD_LIST_STATUS, ADD_NEW_LIST, ADD_NEW_ITEM, DELETE_LIST, DELETE_ITEM, EDIT_LIST_TITLE, ADD_DESCRIPTION, EDIT_ITEM_TITLE } from './ActionTypes'


const initialState = {
    addListStatus: false,
    mainData: [{
        id: 3,
        title: "OnHold",
        items: [{id:33,title:"aksjfajnfd",description:"asdfjhadfjhbasdfhb"}]
    },
    {
        id: 5,
        title: "Pending",
        items: []
    }]

}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ADD_LIST_STATUS: {
            return {
                ...state,
                addListStatus: !state.addListStatus
            }
        }
        case ADD_NEW_LIST: {
            let temp = {
                id: action.payload.id,
                title: action.payload.title,
                items: []
            }
            return {
                ...state,
                mainData: [...state.mainData, temp],
                addListStatus: !state.addListStatus
            }
        }
        case ADD_NEW_ITEM: {
            let temp = {
                id: action.payload.id,
                title: action.payload.title,
                description: ""
            }
            let tempMainData = state.mainData.map((ele) => {
                if (ele.id == action.payload.listId) {
                    ele.items = [...ele.items, temp]
                    return ele
                }
                else {
                    return ele
                }
            })
            return {
                ...state,
                mainData: tempMainData
            }
        }
        case DELETE_LIST: {
            return {
                ...state,
                mainData: state.mainData.filter((ele) => ele.id != action.payload.id)
            }
        }
        case DELETE_ITEM: {
            let temp = state.mainData.map((ele) => {
                if (ele.id == action.payload.listId) {
                    ele.items = ele.items.filter((ele) => ele.id != action.payload.taskId)
                    return ele
                }
                else {
                    return ele
                }
            })
            return {
                ...state,
                mainData: temp
            }
        }
        case EDIT_LIST_TITLE: {
            console.log(action)
            let temp = state.mainData.map((ele) => {
                console.log(ele.id, action.payload.listId)
                if (ele.id == action.payload.listId) {
                    ele.title = action.payload.listTitle
                    return ele
                }
                else {
                    return ele
                }
            })
            // console.log(temp)
            return {
                ...state,
                mainData: temp
            }
        }
        case ADD_DESCRIPTION: {
            let temp = state.mainData.map((ele) => {
                console.log(ele.id, action.payload.listId)
                if (ele.id == action.payload.listId) {
                    ele.items = ele.items.map((ele) => {
                        if (ele.id == action.payload.itemId) {
                            ele.description = action.payload.itemDes
                            return ele
                        }
                        else {
                            return ele
                        }
                    })
                    return ele
                }
                else {
                    return ele
                }
            })
            // console.log(temp)
            return {
                ...state,
                mainData: temp
            }

        }
        case EDIT_ITEM_TITLE: {
            let temp = state.mainData.map((ele) => {
                console.log(ele.id, action.payload.listId)
                if (ele.id == action.payload.listId) {
                    ele.items = ele.items.map((ele) => {
                        if (ele.id == action.payload.itemId) {
                            ele.title = action.payload.itemTitle
                            return ele
                        }
                        else {
                            return ele
                        }
                    })
                    return ele
                }
                else {
                    return ele
                }
            })
            // console.log(temp)
            return {
                ...state,
                mainData: temp
            }

        }
        default: {
            return state
        }
    }
}

export { appReducer }