import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { accountListReducer, addAccountTypeReducer, adminDetailsReducer, employeeListReducer } from "./reducers/adminReducers";
import { accountDetailsReducer, customerListReducer, pendingTransactionListReducer, transactionDetailsReducer } from "./reducers/customerReducers";
import { employeeDetailsReducer, registerEmployeeReducer } from "./reducers/employeeReducers";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    employeeList : employeeListReducer,
    accountList : accountListReducer,
    customerList : customerListReducer,
    accountDetails : accountDetailsReducer,
    transactionDetails : transactionDetailsReducer,
    pendingTransactionDetails : pendingTransactionListReducer,
    registeremployee : registerEmployeeReducer,
    addAccountType : addAccountTypeReducer,
    adminDetails : adminDetailsReducer,
    employeeDetails : employeeDetailsReducer,
});

const userInfoFromStorage = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;