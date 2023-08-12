import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { addAccountType } from '../../redux/actions/adminActions';

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
max-width: 500px;
margin: 20px 150px;  
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


const InputWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 15px;
  color: #303030;
  width: 150px;
`;

const Input = styled.input`
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

const Button = styled.button`
padding: 8px;
width: 80px;
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

const AddAccountType = () => {
  const [name , setName] = useState('');
  const [rate , setRate] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to add this account type?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6439ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addAccountType(name, `${rate}%`));
      }
    })
  }
  return (
    <>
    <Title>
      <h1>ADD NEW ACCOUNT TYPE</h1>
    </Title>
    <form onSubmit={submitHandler}>
    <FormWrapper >
        <InputWrapper>
          <Label>Account Type Name:</Label>
          <Input
            type="text"
            id="accountType"
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Rate:</Label>
          <Input
            type="number"
            id="rate"
            placeholder="0"
            onChange={(e) => setRate(e.target.value)}
          />
          <p>%</p>
        </InputWrapper>
        <Button type="submit">Add</Button>
    </FormWrapper>
    </form>
        </>
  )
}

export default AddAccountType