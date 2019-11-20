

import axios from 'axios/index';

export const FETCH_ALL_STUDENT_DATA = 'FETCH_ALL_STUDENT_DATA';


export const getAllStudentData = () => {
    return (dispatch) => {
        axios.get(`http://192.168.14.125:8080/api/getAll`)
            .then(students => {
                console.log(students.data);
                dispatch({
                    type: FETCH_ALL_STUDENT_DATA,
                    payload: students
                });
            })
    }
};

