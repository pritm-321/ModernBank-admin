import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { registerEmployee } from '../../redux/actions/employeeActions';

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: auto;  
  padding: 15px;
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
`;

const Title=styled.h1`
font-size: 12px;
margin: 15px 20px;
align-text:left;
color: #515151;
padding: 10px 20px 15px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  margin-right: 10px;
  font-size: 15px;
  color: #303030;
  width: 150px;
`;

const FormInput = styled.input`
  margin-right: 30px;
  height: 28px;
  width: 230px;
  padding: 5px 10px;
  border: none;
  outline: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background-color: #f4f4f4;

  &:focus {
    border-bottom: 1px solid #9573e6;
    background-color: #ffffff;
  }
`;

const Block1=styled.div`
  margin-left: 160px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 180px;
  background-color: #6439ff;
  color: white;
  border: none;
  border-radius: 17px;
  font-size: 16px;
  cursor: pointer;
  margin: auto;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #7857f7;
  }
`;

  const RegisterEmployee = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
      
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and Confirm Password do not match!",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Are you sure?",
          text: "Do you want to register this employee?",
          showCancelButton: true,
          confirmButtonText: "Yes, register!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        }).then(async(result) => {
          if(result.isConfirmed){
           // console.log(firstName, middleName, lastName, phone, email, aadhaarNumber, streetName, city, state, pinCode);
            dispatch(registerEmployee(password, firstName , middleName , lastName , phone , email, aadhaarNumber, streetName , city , state ,pinCode));


            }
          })
          }
      setAadhaarNumber("");
      setCity("");
      setConfirmPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setPinCode("");
      setState("");
      setStreetName("");

    };


  return (
    <>
    <Title>
      <h1>EMPLOYEE REGISTER FORM</h1>
    </Title>
    <RegistrationForm onSubmit={submitHandler}>
        <FormRow>
          <FormLabel>Full Name:</FormLabel>
          <FormInput
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            type="text"
            name="middleName"
            placeholder="Middle Name"
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <FormInput
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <FormLabel>Phone:</FormLabel>
          <FormInput
            type="tel"
            name="phone"
            placeholder="### ### ####"
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <FormLabel>Email:</FormLabel>
          <FormInput
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <FormLabel>Aadhaar Number:</FormLabel>
          <FormInput
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            onChange={(e) => setAadhaarNumber(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <FormLabel>Address:</FormLabel>
          <FormInput
            type="text"
            name="streetName"
            placeholder="Street Name"
            onChange={(e) => setStreetName(e.target.value)}
          />
          
          <FormInput
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <Block1>
          <FormInput
            type="text"
            name="state"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
          </Block1>
          <FormInput
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            onChange={(e) => setPinCode(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <FormLabel>Password:</FormLabel>
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <FormLabel>Confirm Password:</FormLabel>
          <FormInput
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormRow>
          <SubmitButton type="submit">Submit</SubmitButton>
        </RegistrationForm>
        </>
  )
}

export default RegisterEmployee