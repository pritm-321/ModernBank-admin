import axios from "axios"
import { ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_REQUEST, ACCOUNT_DETAILS_SUCCESS, CUSTOMER_LIST_FAIL, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_SUCCESS, PENDING_TRANSACTION_LIST_FAIL, PENDING_TRANSACTION_LIST_REQUEST, PENDING_TRANSACTION_LIST_SUCCESS, TRANSACTION_DETAILS_FAIL, TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS } from "../constants/customerConstants"
import Swal from "sweetalert2"


export const getCustomerList = () => async (dispatch , getState) => {
    try {
        dispatch({
            type: CUSTOMER_LIST_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/admin/getAllCustomers',{},
            config
        )

        dispatch({
            type: CUSTOMER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSTOMER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            })
    }
}

export const getAccountDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNT_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/admin/getAccountByAid',
            {
                "aid": id
            },
            config
        )

        dispatch({
            type: ACCOUNT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACCOUNT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            })
    }
}

export const getTransactionDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/admin/getTransactionByTid',
            {
                "tid": id
            },
            config
        )

        dispatch({
            type: TRANSACTION_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TRANSACTION_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            })
    }
}

export const getPendingTransactionDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PENDING_TRANSACTION_LIST_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/admin/getPendingTransactionByTid',
            {tid : id},
            config
        )

        dispatch({
            type: PENDING_TRANSACTION_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PENDING_TRANSACTION_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            })
    }
}

       