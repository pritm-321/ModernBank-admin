import { ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_REQUEST, ACCOUNT_DETAILS_SUCCESS, CUSTOMER_LIST_FAIL, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_SUCCESS, PENDING_TRANSACTION_LIST_FAIL, PENDING_TRANSACTION_LIST_REQUEST, PENDING_TRANSACTION_LIST_SUCCESS, TRANSACTION_DETAILS_FAIL, TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS } from "../constants/customerConstants"

 


 export const customerListReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
      case CUSTOMER_LIST_REQUEST:
         return { loading: true, customers: [] }
      case CUSTOMER_LIST_SUCCESS:
         return { loading: false, customers: action.payload }
      case CUSTOMER_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
    }
     }

       export const accountDetailsReducer = (state = { account: [] }, action) => {
      switch (action.type) {
         case ACCOUNT_DETAILS_REQUEST:
            return { loading: true, account :[] }
         case ACCOUNT_DETAILS_SUCCESS:
            return { loading: false, account: action.payload }
         case ACCOUNT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
         default:
            return state
      }
   }

   export const transactionDetailsReducer = (state = { transactions: [] }, action) => {
      switch (action.type) {
         case TRANSACTION_DETAILS_REQUEST:
            return { loading: true, transactions :[] }
         case TRANSACTION_DETAILS_SUCCESS:
            return { loading: false, transactions: action.payload }
         case TRANSACTION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
         default:
            return state
      }
   }

   export const pendingTransactionListReducer = (state = { pendingTransactions: [] }, action) => {
      switch (action.type) {
         case PENDING_TRANSACTION_LIST_REQUEST:
            return { loading: true, pendingTransactions :[] }
         case PENDING_TRANSACTION_LIST_SUCCESS:
            return { loading: false, pendingTransactions: action.payload }
         case PENDING_TRANSACTION_LIST_FAIL:
            return { loading: false, error: action.payload }
         default:
            return state
      }
   }