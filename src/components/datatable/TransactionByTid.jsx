import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTransactionDetails } from '../../redux/actions/customerActions';
import { MagnifyingGlass } from 'react-loader-spinner';

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

const TransactionDetailsContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 500px;
margin: auto;  
border-radius: 10px;
padding: 15px;
box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
`;

const TransactionDetail = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-size: 15px;
  font-weight: bold;
  width: 210px;
  color: #303030;
`;

const Value = styled.span`
  font-size: 16px;
`;

const TransactionByTid = () => {
  const [tid , setTid] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch (getTransactionDetails(tid))
  }

  const transactionDetails = useSelector((state) => state.transactionDetails)
  const { transactions , loading ,error } = transactionDetails



  return (
    <Container>
    <Title>
      <h1>GET TRANSACTION DETAILS</h1>
      </Title>
    <SearchForm onSubmit={submitHandler}>
      <SearchInput
        type="text"
        placeholder="Enter Transaction ID"
        onChange={(e) => setTid(e.target.value)}
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
        marginLeft: '600px',

      }}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor = '#c0efff'
      color = '#e15b64'
    />


    ) : ( <>
    {transactions?._id ? (
        <TransactionDetailsContainer>
        <TransactionDetail>
          <Label>Amount (&#8377;):</Label>
          <Value>{transactions?.amount}</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Sender Account ID:</Label>
          <Value>{transactions?.senderaid}</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Receiver Account ID:</Label>
          <Value>{transactions?.receiveraid}</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Status:</Label>
          <Value>{transactions?.status === true ? ( <>Success 🟢</>) : (<>Pending 🟡</>) }</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Date: </Label>
          <Value>{transactions?.createdAt}</Value>
        </TransactionDetail>
      </TransactionDetailsContainer>


      ) : (
        <>
        </>

      )
      }
     </>)}
      
  </Container>
  )
}

export default TransactionByTid