import {FETCH_ALL_STUDENT_DATA} from '../actions/student.data.actions'
import {FETCH_ALL_UNIVERSITIES_DATA} from '../actions/student.data.actions'


let initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_STUDENT_DATA:
            return {users: action.payload.data.users, universities: action.payload.data.universities};
        default:
            return state;
    }
}