import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeList } from "../../redux/actions/adminActions";
import { ThreeCircles } from "react-loader-spinner";
import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Datatable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const [openMap1, setOpenMap1] = useState({});
  const handleOpen1 = (id) => {
    setOpenMap1((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };
  
  const handleClose1 = (id) => {
    setOpenMap1((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const employeeList = useSelector((state) => state.employeeList);
  const { employees, loading, error } = employeeList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(fetchEmployeeList());
  }, [userInfo, navigate]);

  const userColumns = [
    { field: "uid",
     headerName: "ID", 
     width: 90 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      // editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      // editable: true,
    },
    {
      field: "details",
      headerName: "Details",
      width: 180,
      renderCell: (params) => {
        const isOpen1 = openMap1[params.row._id] || false;
        return (
          <>
            <button className="viewButton mt-2 mb-2" onClick={() => handleOpen1(params.row._id)}>
              View Details
            </button>
            <Modal
              open={isOpen1}
              onClose={() => handleClose1(params.row._id)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style1}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Employee Details
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>UID</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        {/* <TableCell align="center">Middle Name</TableCell> */}
                        <TableCell align="center">Aadhar Number</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                     
                        <TableRow
                          key={params.row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                          {params.row?.uid}
                          </TableCell>
                          <TableCell component="th" scope="row">
                          {params.row?.firstName}
                          </TableCell>
                          <TableCell align="center">{params.row?.lastName}</TableCell>
                          {/* <TableCell align="center">{params.row?.middleName}</TableCell> */}
                          <TableCell align="center">{params.row?.aadharNo}</TableCell>
                          <TableCell align="center">{params.row?.email}</TableCell>
                          <TableCell align="center">{params.row?.phone}</TableCell>
                          <TableCell align="center">{params.row?.streetName}, {params.row?.city},{params.row?.pinCode},{params.row?.state}</TableCell>
                        </TableRow>
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Modal>
          </>
        );
      },
      type: "String",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      // editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      // editable: true,
    },
    {
      field: "aadharNo",
      headerName: "Aadhar No",
      width: 150,
      // editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      // editable: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 150,
      // editable: true,
    },
    {
      field: "pinCode",
      headerName: "Pin Code",
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
        Employee List
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <>
          <ThreeCircles
            height="100"
            width="100"
            color="blue"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </>
      ) : (
        <>
          <DataGrid
            className="datagrid"
            rows={employees}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            getRowId={(row) => row._id}
              getRowHeight={()=>"auto"}
            checkboxSelection
          />
        </>
      )}
    </div>
  );
};

export default Datatable;
