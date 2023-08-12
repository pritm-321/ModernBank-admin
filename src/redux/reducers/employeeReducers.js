import { EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, REGISTER_EMPLOYEE_FAIL, REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_SUCCESS } from "../constants/employeeConstants"


export const registerEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_EMPLOYEE_REQUEST:
            return { loading: true }
        case REGISTER_EMPLOYEE_SUCCESS:
            return { loading: false, employeeInfo: action.payload }
        case REGISTER_EMPLOYEE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const employeeDetailsReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case EMPLOYEE_DETAILS_SUCCESS:
            return { loading: false, employee: action.payload }
        case EMPLOYEE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}