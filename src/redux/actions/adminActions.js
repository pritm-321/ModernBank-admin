import axios from "axios"
import { ACCOUNT_LIST_FAIL, ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS, ADD_ACCOUNT_TYPE_FAIL, ADD_ACCOUNT_TYPE_REQUEST, ADD_ACCOUNT_TYPE_SUCCESS, ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, EMPLOYEE_LIST_FAIL, EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS } from "../constants/adminConstants"
import Swal from "sweetalert2"


export const fetchEmployeeList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EMPLOYEE_LIST_REQUEST
        })
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://modernbank-backend.onrender.com/api/v1/admin/getAllEmployees',{},
            config
        )

        dispatch({
            type: EMPLOYEE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const getAccountList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNT_LIST_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://modernbank-backend.onrender.com/api/v1/admin/getAllAccounts',{},
            config
        )

        dispatch({
            type: ACCOUNT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACCOUNT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const addAccountType = (name , rate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_ACCOUNT_TYPE_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://modernbank-backend.onrender.com/api/v1/admin/addAccountType',
            {
                "name": name,
                "rate": rate
            },
            config
        )

        dispatch({
            type: ADD_ACCOUNT_TYPE_SUCCESS,
            payload: data
        })
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Account Type Added Successfully',
            })

    } catch (error) {
        dispatch({
            type: ADD_ACCOUNT_TYPE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response && error.response.data.message,
            })
    }
}

export const getAdminDetails = (id) => async (dispatch , getState) => {
    try {
        dispatch({
            type: ADMIN_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://modernbank-backend.onrender.com/api/v1/admin/GetAdminByUid',
            {
                "uid": id
            },
            config
        )

        dispatch({
            type: ADMIN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response && error.response.data.message,
            })
    }
}
