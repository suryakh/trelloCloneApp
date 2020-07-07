import { CHANGE_ADD_LIST_STATUS, ADD_NEW_LIST, ADD_NEW_ITEM, DELETE_LIST, DELETE_TASK } from './ActionTypes'


const initialState = {
    addListStatus: false,
    mainData: [{
        id: 3,
        title: "OnHold",
        items: []
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
        case DELETE_TASK: {
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
        default: {
            return state
        }
    }
}

export { appReducer }