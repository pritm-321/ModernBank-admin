import axios from "axios"
import { EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, REGISTER_EMPLOYEE_FAIL, REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_SUCCESS } from "../constants/employeeConstants"
import Swal from "sweetalert2"

export const registerEmployee = (password, firstName , middleName , lastName , phone , email, aadharNo, streetName , city , state ,pinCode) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REGISTER_EMPLOYEE_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //console.log(password, firstName , middleName , lastName , phone , email, aadharNo, streetName , city , state ,pinCode);

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/admin/registerEmployee',
            {
                "password": password,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "phone": phone,
                "email": email,
                "aadharNo": aadharNo,
                "streetName": streetName,
                "city": city,
                "state": state,
                "pinCode": pinCode
            },
            config
        )

        dispatch({
            type: REGISTER_EMPLOYEE_SUCCESS,
            payload: data
        })

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Employee Registered Successfully!',
            })

    } catch (error) {
        dispatch({
            type: REGISTER_EMPLOYEE_FAIL,
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


export const getEmployeeDetails = (id) => async (dispatch , getState) => {
    try {
        dispatch({
            type: EMPLOYEE_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} =await axios.post(
            'https://banking.enthouse.in/api/v1/employee/GetEmployeeByUid',
            {
                "uid": id
            },
            config
        )

        dispatch({
            type: EMPLOYEE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
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