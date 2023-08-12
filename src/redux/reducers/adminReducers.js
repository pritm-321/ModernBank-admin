import { ACCOUNT_LIST_FAIL, ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS, ADD_ACCOUNT_TYPE_FAIL, ADD_ACCOUNT_TYPE_REQUEST, ADD_ACCOUNT_TYPE_SUCCESS, ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, EMPLOYEE_LIST_FAIL, EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS } from "../constants/adminConstants";


export const employeeListReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
        case EMPLOYEE_LIST_REQUEST:
            return { loading: true, employees: [] };
        case EMPLOYEE_LIST_SUCCESS:
            return { loading: false, employees: action.payload };
        case EMPLOYEE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const accountListReducer = (state = { accounts: [] }, action) => {
    switch (action.type) {
        case ACCOUNT_LIST_REQUEST:
            return { loading: true, accounts: [] };
        case ACCOUNT_LIST_SUCCESS:
            return { loading: false, accounts: action.payload };
        case ACCOUNT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const addAccountTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ACCOUNT_TYPE_REQUEST:
            return { loading: true }
        case ADD_ACCOUNT_TYPE_SUCCESS:
            return { loading: false, accountTypeInfo: action.payload }
        case ADD_ACCOUNT_TYPE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const adminDetailsReducer = (state = { admin: {} }, action) => {
    switch (action.type) {
        case ADMIN_DETAILS_REQUEST:
            return { loading: true }
        case ADMIN_DETAILS_SUCCESS:
            return { loading: false, admin: action.payload }
        case ADMIN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}