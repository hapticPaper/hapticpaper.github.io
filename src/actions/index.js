
import * as types from '../constants/actions'
import { useDispatch } from "react-redux";


export const switchPage = (route) => ({
    type: types.SWITCH_PAGE,
    route
})
