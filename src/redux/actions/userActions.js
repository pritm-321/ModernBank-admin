import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import Swal from "sweetalert2"



export const adminLogin =(uid,password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} =await axios.post(
            'https://banking-backend-zynj.onrender.com/api/v1/admin/loginAdmin',
            {uid,password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))

        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome Admin',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Credentials',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const employeeLogin =(uid,password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} =await axios.post(
            'https://banking-backend-zynj.onrender.com/api/v1/employee/loginEmployee',
            {uid,password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))

        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome Employee',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Credentials',
            showConfirmButton: false,
            timer: 1500
        })

    }
}


export const logout = () => (dispatch) => {
    sessionStorage.removeItem('userInfo')
    dispatch({type: USER_LOGIN_FAIL})

    Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'See you soon',
        showConfirmButton: false,
        timer: 1500
    })
}