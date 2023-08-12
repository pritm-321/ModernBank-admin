import { useEffect, useState } from "react";
import "./login.scss";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, employeeLogin } from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6f48fa, #c0aefc);
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  color: #ffffff;
  font-size: 18px;
  padding: 0 0 20px;
`;

const Heading = styled.div`
  margin-bottom: 38px;
  color: #29293d;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 40px 47px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  height: 28px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f5f5f5;

  &:focus {
    outline: 1px solid #6032fa;
    background-color: #ffffff;
  }
`;

const ForgotPassword = styled.a`
  font-size: 14px;
  color: #29293d;
  text-decoration: none;
  cursor: pointer;
  margin-left: 108px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #007bff;
  }
`;

const LoginRadio = styled.div`
  align-items: left;
  margin: 20px 0 14px -40px;

  label {
    margin-right: 16px;
  }
`;

const Block = styled.div`
  margin: 8px 5px;
  color: #1f1f2e;
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #6439ff;
  background-color: #f7f7f7;
  color: #6439ff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #6439ff;
    color: #f7f7f7;
  }
`;

const CreateAccount = styled.a`
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  color: #8d7fcc;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  margin-top: 16px;

  &:hover {
    color: #6c50a4;
  }
`;

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo,loading ,error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if(!role){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a role!",
      });
    }
    if(role === "admin"){
      console.log("Admin API call");
      dispatch(adminLogin(username, password));
      navigate('/')
    }

    if(role === "employee"){
      console.log("Employee API call");
      dispatch(employeeLogin(username, password));
      navigate('/')

    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  

  return (
    <LoginContainer>
      <Header>
        <h1 style={{ fontFamily: "Nunito,sans-serif" }}>MODERN BANK</h1>
      </Header>
      <LoginForm onSubmit={submitHandler}>
        <Heading>
          <h2>Login to your account</h2>
        </Heading>

        <FormField style={{ marginBottom: "20px" }}>
          <Label htmlFor="username">Username:</Label>
          <Input type="text"
           id="username"
           name="username"
           onChange={(e) => {
            setUsername(e.target.value);
          }
           }
            placeholder="UID" 
            required />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
        </FormField>
        <ForgotPassword href="#">Forgot Password?</ForgotPassword>
        <LoginRadio>
          <Label htmlFor="login">Login as:</Label>
          <Block>
            <label>
              <input 
              type="radio" 
              name="loginType" 
              value="admin" 
              onChange={(e) => {
                setRole(e.target.value);
              }
              }
              />
              Admin
            </label>
            <label>
              <input
               type="radio"
                name="loginType" 
                value="employee"
                onChange={(e) => {
                  setRole(e.target.value);
                }
                }
                />
              Employee
            </label>
          </Block>
        </LoginRadio>
        {loading ? 
        (

          <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
        ):
        (
          <Button type="submit">Login</Button>
        )
      }
        {/* <Button type="submit">Login</Button> */}
      
        {/* <CreateAccount>
          <p>New to the site?</p>
          <a href="#">Sign up</a>
        </CreateAccount> */}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
