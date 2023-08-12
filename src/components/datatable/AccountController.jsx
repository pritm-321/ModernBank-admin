import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAccountDetails } from '../../redux/actions/customerActions';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
import Swal from 'sweetalert2';

const Container = styled.div`
`;

const Title = styled.h1`
font-size: 12px;
margin: 15px 20px;
align-text:left;
color: #515151;
padding: 10px 20px 15px;
`;

const SearchForm = styled.form`
  display: flex;
  margin: 60px;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 5px;

  &:focus {
    outline: none;
    border: 1px solid #666666;
    background-color: #ffffff;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #6439ff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #7857f7;
  }
`;

const AccountDetailsContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 400px;
margin: auto;  
border-radius: 10px;
padding: 15px;
box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
`;

const AccountDetail = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-size: 15px;
  font-weight: bold;
  width: 150px;
  color: #303030;
`;

const Value = styled.span`
  font-size: 16px;
`;

const FreezeButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #dc3545;
  border: 1px solid #dc3545;
  cursor: pointer;
  margin-right: 1rem;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #dc3545;
    color: #f7f7f7;
`;

const UnfreezeButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 1px solid #28a745;
  color: #28a745;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  
  &:hover {
    background-color: #28a745;
    color: #f7f7f7;
`;

const Button = styled.div`
display: flex;
justify-content: center;
padding-top: 20px;
margin-left: 200px;
`;



const AccountController = () => {

  const [id , setId] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAccountDetails(id));
  }

  const handleUnfreezeClick =async () => {
    if (account)
    {
      try{
        const {data} = await axios.post("https://banking-backend-zynj.onrender.com/api/v1/admin/unfreezeAccountByAid", {aid : account.aid}, {})
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Account Activated',
          text: 'Account has been activated successfully',
      }
      )

      }catch(error){
        console.log(error);
      }

      
    }
  }

  const handleFreezeClick =async () => {
    if (account)
    {
      try{
        const {data} = await axios.post("https://banking-backend-zynj.onrender.com/api/v1/admin/freezeAccountByAid", {aid : account.aid}, {})
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Account Deactivated',
          text: 'Account has been deactivated successfully',
      }
      )

      }catch(error){
        console.log(error);
      }

      
    }
  }

  const accountDetails = useSelector((state) => state.accountDetails);
  const { loading, error, account } = accountDetails;

  useEffect(() => {
    if (account) {
      console.log(account);
    }
   
  }, [account]);



  return (
    <Container>
    <Title>
      <h1>ACCOUNTS DASHBOARD</h1>
      </Title>
    <SearchForm onSubmit={submitHandler}>
      <SearchInput
        type="text"
        placeholder="Enter Account ID"
        onChange={(e) => setId(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
    {loading ? (
      <MagnifyingGlass
      visible={true}
      height="100"
      width="100"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
        marginLeft: '500px',

      }}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor = '#c0efff'
      color = '#e15b64'
    />

    ): (
      <>
        {account?._id ? (
        <>
        <AccountDetailsContainer>
        <AccountDetail>
          <Label>Account Type: {account?.atypeid}</Label>
          <Value></Value>
        </AccountDetail>
        <AccountDetail>
          <Label>Balance: {account?.balance}</Label>
          <Value></Value>
        </AccountDetail>
        <AccountDetail>
          <Label>Nominee:{account?.nominee}</Label>
          <Value></Value>
        </AccountDetail>
        <AccountDetail>
          <Label>Status: {account?.status === true ? (<>Active 🟢</>) : (<> Inactive 🔴 </>)}</Label>
          <Value></Value>
        </AccountDetail>
      </AccountDetailsContainer>
      <Button>
        {account?.status === true ? (
          <FreezeButton onClick={handleFreezeClick}>Freeze</FreezeButton>
        ) : ( 
          <UnfreezeButton onClick={handleUnfreezeClick}>Unfreeze</UnfreezeButton>
        )}
      
      
      </Button>
      </>
      )
      :
      (
        <></>
      )
    }
      </>

    )}
    
  </Container>
  )
}

export default AccountController