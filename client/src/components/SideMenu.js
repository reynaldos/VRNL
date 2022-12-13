import React from 'react';
import styled from "styled-components";

import { 
  HiStar,
  HiOutlineStar, 
} from "react-icons/hi2";

import { IoAdd } from "react-icons/io5";

// import { 
//     HiOutlineUserGroup,
//     HiOutlineUser
//  } from "react-icons/hi";


export const SideMenu = ({type}) => {

  return (
  <Container>
    <Wrapper>
      <TitleWrap>
        <Title>{type === 'myvournals'? 'My Vournals':'Subscribers'}</Title>
      </TitleWrap>
     
        <TabsWrap>
          <Tab>
            <TabIcon><HiStar size={24}/></TabIcon>
            <TabText>Tab 1</TabText>
          </Tab>

           <Tab>
             <TabIcon><HiOutlineStar size={24}/></TabIcon>
            <TabText>Tab 2</TabText>
          </Tab>

           <Tab>
             <TabIcon><IoAdd size={24} style={{color:``}}/></TabIcon>
            <TabText>Create Collection</TabText>
          </Tab>
         
        </TabsWrap>

      </Wrapper>
    </Container>
  )
}


const Container = styled.menu`
    /* position: fixed; */
    flex: 1;
    height: 90%;
    max-height: 900;
    min-width: 300px;
    max-width: 360px;
    color:white;

    align-self: center;
    display: grid;
    place-items: center;

    @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
       display: none;
    } 
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    background: ${({theme})=>theme.elementBG};
	  border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
    border-left: none;
    border-top-right-radius: ${({theme})=>theme.borderRadius};
    border-bottom-right-radius: ${({theme})=>theme.borderRadius};
    margin: 1rem;

    backdrop-filter: ${({theme})=>theme.blur};
    -webkit-backdrop-filter: ${({theme})=>theme.blur};

`

const TitleWrap = styled.div`

  height: 100px;
  border-bottom:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  display:flex;
  align-items:flex-end;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem;
`

const TabsWrap = styled.ul`
  list-style: none;



`

const Tab = styled.li`
  border-bottom: ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  padding: .5rem 0;
  display:flex;
  align-items: center;

   &:hover{
    cursor: pointer;
    background-color: rgba(255,255,255, .25)
  }

`

const TabIcon = styled.div`
  height: 32px;
  margin-left: 1rem;
  margin-right: .5rem;
  display: grid;
  place-content: center;

  &:hover{
    cursor: pointer;
  }

`

const TabText = styled.h4`
  font-size: 1.5rem;

`