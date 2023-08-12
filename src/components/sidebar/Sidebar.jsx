import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoupeIcon from "@mui/icons-material/Loupe";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usedispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log me out!",
      cancelButtonText: "No, keep me logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        usedispatch(logout());
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "You are still logged in :)",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });

    navigate("/login");
  };

  const AdminSidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">MODERN BANK</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                <DashboardIcon className="icon" />
                <span> Admin Dashboard</span>
              </Link>
            </li>
            <p className="title">ADMIN FEATURES</p>
            <Link to="/getallcustomers" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span> All Customers</span>
              </li>
            </Link>
            <Link
              to="/admin/getallemployees"
              style={{ textDecoration: "none" }}
            >
              <li>
                <GroupsIcon className="icon" />
                <span> All Employees</span>
              </li>
            </Link>
            <Link to="/admin/getallaccounts" style={{ textDecoration: "none" }}>
              <li>
                <AccountBalanceIcon className="icon" />
                <span>All Accounts</span>
              </li>
            </Link>
            <Link to="/accountcontroller" style={{ textDecoration: "none" }}>
              <li>
                <AccountTreeIcon className="icon" />
                <span> Accounts Dashboard</span>
              </li>
            </Link>
            <Link to="/gettransactionbytid" style={{ textDecoration: "none" }}>
              <li>
                <ReceiptLongIcon className="icon" />
                <span>Get Transaction Details</span>
              </li>
            </Link>
            <Link
              to="/transactioncontroller"
              style={{ textDecoration: "none" }}
            >
              <li>
                <CurrencyRupeeIcon className="icon" />
                <span>Transaction Dashboard</span>
              </li>
            </Link>
            <Link
              to="/admin/registeremployee"
              style={{ textDecoration: "none" }}
            >
              <li>
                <GroupAddIcon className="icon" />
                <span>Register Employee</span>
              </li>
            </Link>
            <Link to="/admin/addaccounttype" style={{ textDecoration: "none" }}>
              <li>
                <LoupeIcon className="icon" />
                <span>Add account type</span>
              </li>
            </Link>
            <Link to="/admin/getadminbyuid" style={{ textDecoration: "none" }}>
              <li>
                <ManageAccountsIcon className="icon" />
                <span>Get Admin Details</span>
              </li>
            </Link>
            <Link to="/getemployeebyuid" style={{ textDecoration: "none" }}>
              <li>
                <ManageAccountsIcon className="icon" />
                <span>Get Employee Details</span>
              </li>
            </Link>
            <p className="title">USEFUL</p>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <div onClick={logoutHandler}>
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    );
  };

  const EmployeeSidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">MODERN BANK</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <span> Employee Dashboard</span>
            </li>
            <p className="title">BANK EMPLOYEE FEATURES</p>
            <Link
              to="/getallcustomers"
              style={{ textDecoration: "none" }}
            >
            <li>
              <PersonOutlineIcon className="icon" />
              <span> All Customers</span>
          </li>
        </Link>
        <Link to="/admin/getallaccounts" style={{ textDecoration: "none" }}>
          <li>
            <AccountBalanceIcon className="icon" />
            <span>All Accounts</span>
            </li>
          </Link>
          <Link to="/accountcontroller" style={{ textDecoration: "none" }}>
            <li>
              <AccountTreeIcon className="icon" />
              <span> Accounts Dashboard</span>
            </li>
          </Link>
        <Link to="/gettransactionbytid" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptLongIcon className="icon" />
              <span>Get Transaction Details</span>
            </li>
        </Link>
        <Link to="/transactioncontroller" style={{ textDecoration: "none" }}>
            <li>
              <CurrencyRupeeIcon className="icon" />
              <span>Transaction Dashboard</span>
            </li>
        </Link>
        <Link to="/getemployeebyuid" style={{ textDecoration: "none" }}>
        <li>
          <ManageAccountsIcon className="icon" />
          <span>Get Employee Details</span>
        </li>
        </Link>
            <p className="title">USEFUL</p>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
          <div onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </div>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* {console.log(userInfo?.findUser?.role)} */}
      {userInfo && userInfo?.findUser?.role === "admin" ? (
        <AdminSidebar />
      ) : (
        <EmployeeSidebar />
      )}
    </>
  );
};

export default Sidebar;
