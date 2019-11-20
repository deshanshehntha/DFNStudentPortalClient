
import axios from 'axios/index';

export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';

export const getAllUsers = (newUser) => {
    return (dispatch) => {
        axios.post(`http://192.168.16.95:5001/api/construction/user/get/`, newUser)
            .then(users => {
                dispatch({
                    type: FETCH_USERS,
                    payload: users
                });
            })
    }
};

export const addUser = (newUser) => {
    return (dispatch) => {
        dispatch({
            type: ADD_USER,
            payload: newUser
        })
    }
}