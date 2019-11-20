
import { FETCH_USERS } from '../actions/users.actions'

let initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return { success: action.payload.data.success, user: action.payload.data.user };
        default:
            return state;
    }
}