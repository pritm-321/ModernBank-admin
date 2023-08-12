import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import AllEmployees from "../../components/datatable/AllEmployees"
import AllAccounts from "../../components/datatable/AllAccounts"
import RegisterEmployee from "../../components/datatable/RegisterEmployee"
import AddAccountType from "../../components/datatable/AddAccountType"
import GetAdminByUid from "../../components/datatable/GetAdminByUid"
import AllCustomers from "../../components/datatable/AllCustomers"
import TransactionController from "../../components/datatable/TransactionController"
import AccountController from "../../components/datatable/AccountController"
import TransactionByTid from "../../components/datatable/TransactionByTid"
import GetEmployeeByUid from "../../components/datatable/GetEmployeeByUid"


const List = (props) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {
          props.getallemployees === true ? <AllEmployees/> 
          : props.getallaccounts === true ? <AllAccounts/>
          : props.registeremployee === true ? <RegisterEmployee/>
          : props.addaccounttype === true ? <AddAccountType/>
          : props.getadminbyuid === true ? <GetAdminByUid/>
          : props.getallcustomers === true ? <AllCustomers/>
          : props.accountcontroller === true ? <AccountController/>
          : props.gettransactionbytid === true ? <TransactionByTid/>
          : props.transactioncontroller === true ? <TransactionController/>
          :props.getemployeebyuid === true ? <GetEmployeeByUid/>
          : null
        }
      </div>
    </div>
  )
}

export default List