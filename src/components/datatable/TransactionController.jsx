import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPendingTransactionDetails } from '../../redux/actions/customerActions';
import { MagnifyingGlass } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import axios from 'axios';

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

const ApproveButton = styled.button`
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #28a745;
  color: #f7f7f7;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  
  &:hover {
    background-color: #fff;
    border: 1px solid #28a745;
    color: #28a745;
`;

const Button = styled.div`
display: flex;
justify-content: center;
padding-top: 20px;
margin-left: 350px;
`;

const TransactionController = () => {
  const [transactionId, setTransactionId] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPendingTransactionDetails(transactionId));
  };

  const transactionDetails = useSelector((state) => state.pendingTransactionDetails);
  const { loading, error, pendingTransactions : transaction } = transactionDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const approveWithdrawHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to approve this transaction!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try
        {
          const {data} = await axios.post('https://banking-backend-zynj.onrender.com/api/v1/admin/AcceptWithdraw',
          {
            "tid": transaction.tid,
            "uid" : userInfo.findUser.uid
          }
          )
          Swal.fire(
            'Approved!',
            data.message,
            'success'
          )

        }
        catch(error)
        {
          Swal.fire(
            'Error!',
            'Something went wrong.',
            'error'
          )
        }
      }
    })
  }


  const approveDepositHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to approve this transaction!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try
        {
          const {data} = await axios.post('https://banking-backend-zynj.onrender.com/api/v1/admin/AcceptDeposit',
          {
            "tid": transaction.tid,
            "uid" : userInfo.findUser.uid
          }
          )
          Swal.fire(
            'Approved!',
            data.message,
            'success'
          )

        }
        catch(error)
        {
          Swal.fire(
            'Error!',
            'Something went wrong.',
            'error'
          )
        }
      }
    })
  }



  return (
    <Container>
    <Title>
      <h1>TRANSACTION DASHBOARD</h1>
      </Title>
    <SearchForm onSubmit={submitHandler}>
      <SearchInput
        type="text"
        placeholder="Enter Transaction ID"
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
    {
      loading ? (
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
      )
      :
      (
        <>
        {
        transaction?._id ? 
        (
          <>
          <TransactionDetailsContainer>
        <TransactionDetail>
          <Label>Amount (&#8377;):</Label>
          <Value> {transaction?.amount}</Value>
        </TransactionDetail>
        {/* <TransactionDetail>
          <Label>Sender Account ID:</Label>
          <Value></Value>
        </TransactionDetail> */}
        <TransactionDetail>
          <Label> Account ID:</Label>
          <Value>{transaction?.aid}</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Topic: </Label>
          <Value>{transaction?.topic}</Value>
        </TransactionDetail>
        <TransactionDetail>
          <Label>Date: </Label>
          <Value>{transaction?.createdAt}</Value>
        </TransactionDetail>
      </TransactionDetailsContainer>
      <Button>
        {/* {console.log(transaction?.topic)} */}
        {transaction?.topic === "Deposit requested generated success" ?
         (
          <ApproveButton onClick={approveDepositHandler}>&#10003; Approve</ApproveButton>
         ) :
          (
            <ApproveButton onClick={approveWithdrawHandler}>&#10003; Approve</ApproveButton>
           )
        }
      
      </Button>
          </>
        )
        :
        (
          <></>
        )
      }
        </>
      )
    }
      
  </Container>
  )
}

export default TransactionController