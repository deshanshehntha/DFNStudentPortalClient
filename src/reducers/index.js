import users from '../reducers/user.reducer'
import {combineReducers} from 'redux'
import student from '../reducers/student.reducer'

const rootReducer = combineReducers({
    users,
    student
});

export default rootReducer