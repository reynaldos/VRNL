import React from 'react';
import styled from "styled-components";
import {PageButton} from '../components/PageButton';

import { IoSettingsOutline } from "react-icons/io5";
import { 
    HiOutlineUserGroup,
    HiOutlineUser
  } from "react-icons/hi";

  
const Btns = [
  {
    name: 'My Vournals',
    path: 'myvournals',
    Icon: HiOutlineUser
  },
   {
    name: 'Subscribers',
    path: 'subscribers',
    Icon: HiOutlineUserGroup
  },
   {
    name: 'Settings',
    path: 'settings',
    Icon: IoSettingsOutline
  },
]
const Home = () => {

  return (
    <>
      <Title>VRNL</Title>
      <Container>
        <UserTag>hey reysanxez!</UserTag>

        <Wrapper>
          {Btns.map((btn, i)=>{
              return <div key={i}>
                      <PageButton info={btn}/>            
                      <BtnTitle>{btn.name}</BtnTitle>
                    </div>
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
  line-height: 1rem;
  text-transform: uppercase;

  span{
     line-height: 5rem;
    font-size: 1.5rem;
  }
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


const Btn = styled.button`
  width: 200px;
  aspect-ratio: 1;
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 4px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .5rem;
  margin: 0 1rem;

	font: inherit;
	
	outline: inherit;

  display: flex;
  align-items:center;
  justify-content:center;
  backdrop-filter: ${({theme})=>theme.blur};
 

  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
   width: 136px;
  }

   @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
   width: 108px;
  }


  &:hover{
    cursor: pointer;
     border: ${({theme})=>`solid ${theme.icon} 4px`};
  }
  
`

const BtnContent = styled.div`
  color: ${({theme})=>theme.icon};
  display: grid;
  place-content: center;
  line-height: 1rem;
  font-size: 1rem;
`

const BtnTitle = styled.h4`
  margin-top: .25rem;
  text-align: center;
  margin-bottom: 1.25em;


  @media screen and (min-width: ${({theme}) => theme.breakpoint.md}){
   font-size: 1.4rem;
  }
`