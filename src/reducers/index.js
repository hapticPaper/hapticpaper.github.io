
import { combineReducers } from 'redux'
import * as types from '../constants/actions'


export const route = (state='Welcome', action) => {
    if (action.type==types.SWITCH_PAGE){
        return action.route
    }
    else{return state}
}

const rootReducer = combineReducers({
    route,
    // user,
    // cookie_info
})

export default rootReducer