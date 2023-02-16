import React, { useEffect } from 'react';
import styled from "styled-components";
import {PageButton} from '../components/PageButton';

import { IoSettingsOutline } from "react-icons/io5";
import { 
    HiOutlineUserGroup,
    HiOutlineUser
  } from "react-icons/hi";


import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

  
const Btns = [
  {
    name: 'My Vournals',
    path: 'myvournals',
    Icon: HiOutlineUser
  },
   {
    name: 'Subscribers',
    path: 'subscribers',
    Icon: HiOutlineUserGroup,
    disabled: true
  },
   {
    name: 'Settings',
    path: 'settings',
    Icon: IoSettingsOutline
  },
]
const Home = () => {

  const { currentUser } = useSelector(state=>state.user);
  const navigate = useNavigate();


  useEffect(() => {
    
    if(!currentUser){
        navigate('/signin');
    }
  
    return () => {
      
    }
  }, []);
  

  return (
    <>
      <Title>VRNL</Title>
      <Container>
        <UserTag>hey {currentUser.name}!</UserTag>

        <Wrapper>
          {Btns.map((btn, i)=>{
              return <PageButton key={i} info={btn}/>   
            })}

        </Wrapper>
      </Container>
    </>
  )
}

export default Home


const Title = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  margin: 1rem;
  font-size: 3rem;
  line-height: 2.5rem;
  text-transform: uppercase;

  /* span{
     line-height: 5rem;
    font-size: 1.5rem;
  } */
`

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
`

const UserTag = styled.h2`
  margin: 1rem;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}){
    text-align: center;

  }
`


const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;

   @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    flex-wrap: wrap;
    justify-content: center;

  }
`



