import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountList } from "../../redux/actions/adminActions";

const Datatable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [data, setData] = useState(userRows);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accountList = useSelector((state) => state.accountList);
  const { accounts, loading, error } = accountList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getAccountList());
  }, [userInfo, navigate]);


  const userColumns = [
    {
      field: "uid",
      headerName: "User ID",
      width: 150,
      // editable: true,
    },
    { field: "aid", 
      headerName: "Account ID",
      width: 150,
      // editable: true,
  },
    {
      field: "atypeid",
      headerName: "Account Type ID",
      width: 150,
      // editable: true,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      // editable: true,
    },
    {
      field: "nominee",
      headerName: "Nominee",
      width: 150,
      // editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status.toString()}
          </div>
        );
      },
      width: 150,
      // editable: true,
    },
  ];

   

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
       List of All Accounts
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={accounts}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
        getRowHeight={()=>"auto"}
        checkboxSelection
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          '& .super-app-theme--header': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
          },
        }}
      />
    </div>
  );
};

export default Datatable;
