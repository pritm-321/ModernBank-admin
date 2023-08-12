import React, { useState } from 'react'
import styled from 'styled-components';
import PersonIcon from "@mui/icons-material/Person";
import  PortraitIcon from '@mui/icons-material/Portrait';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDetails } from '../../redux/actions/adminActions';
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

const Label = styled.label`
margin-right: 10px;
font-size: 15px;
color: #303030;
`;

const Input = styled.input`
margin-right: 30px;
height: 28px;
width: 230px;
padding: 5px 10px;
border: none;
border-bottom: 1px solid #666666;
border-radius: 6px;
font-size: 15px;
background-color: #F9F9F9;

  &:focus {
    outline: none;
    border-bottom: 1px solid #9573e6;
    background-color: #ffffff;
  }
`;

const Button = styled.button`
padding: 6px;
width: 100px;
margin-left: 20px;
background-color: #6439ff;
color: white;
border: none;
border-radius: 13px;
font-size: 16px;
cursor: pointer;
transition: 0.2s ease-in-out;

&:hover {
  background-color: #7857f7;
}
`;

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 700px;
margin: auto;  
border-radius: 10px;
padding: 15px;
background-color: #f9f7fa;
box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
`;

const DetailsTitle = styled.h2`
font-size: 12px;
align-text:left;
color: #515151;
padding: 5px 15px 10px;
`;

const DetailsLabel= styled.div`
padding-left: 10px;
font-size: 15px;
color: #303030;
`;

const DetailsInput = styled.div`
padding-left: 30px;
font-size: 17px;
`;

const Details = styled.p`
margin: 10px 70px;
display: flex;
flex-direction: row;
padding: 5px;
`;


const GetAdminByUid = () => {
  const [uid, setUid] = useState("")
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAdminDetails(uid))
  }

  const adminDetails = useSelector((state) => state.adminDetails);
  const { loading, error, admin } = adminDetails;


  return (
    <Container>
      <Title>
        <h1>GET ADMIN DETAILS</h1>
        </Title>
        <form onSubmit={handleSubmit}>
      <SearchContainer >
        <Label>ADMIN UID:</Label>
        <Input
          type="text"
          onChange={(e) => setUid(e.target.value)}
        />
        <Button type='submit'>Search</Button>
      </SearchContainer>
      </form>
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

      ) : (
        <>
       {
        admin?._id ? (
          <>
        <DetailsContainer>
          <DetailsTitle>
            <h2>ADMIN DETAILS</h2>
          </DetailsTitle>
          
          <Details>
             <PersonIcon fontSize="small" style={{color:"green"}} />
            <DetailsLabel>Name:</DetailsLabel>
            <DetailsInput>{`${admin?.firstName} ${admin?.middleName} ${admin?.lastName}` }</DetailsInput>
            </Details>
          <Details>
            <PhoneIcon fontSize="small" style={{color:"blue"}} />
            <DetailsLabel>Phone:</DetailsLabel>
            <DetailsInput>{admin?.phone}</DetailsInput>
            </Details>
          <Details>
            <MailOutlineIcon fontSize="small" style={{color:"red"}} />
            <DetailsLabel>Email:</DetailsLabel>
            <DetailsInput>{admin?.email}</DetailsInput>
            </Details>
          <Details>
            <HomeIcon fontSize="small"style={{color:"yellow"}} />
            <DetailsLabel>Address:</DetailsLabel>
            <DetailsInput>{
              `${admin?.streetName} , ${admin?.city} , ${admin?.state}, ${admin?.pinCode}`
              }</DetailsInput>
            </Details>
        </DetailsContainer>
        </>
        ) : ( <></>)
       }
       </>
        
      )}
        
    </Container>
  )
}

export default GetAdminByUid