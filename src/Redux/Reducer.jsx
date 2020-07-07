import { ADD,CHANGE_ADD_LIST_STATUS } from './ActionTypes'


const initialState = {
    addListStatus:false,
    maindata: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD: {
            return state
        }
        case CHANGE_ADD_LIST_STATUS:{
            return {
                ...state,
                addListStatus:!state.addListStatus
            }
        }
        default: {
            return state
        }
    }
}

export { appReducer }