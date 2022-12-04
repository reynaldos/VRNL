import React from 'react';
import styled from "styled-components";
import { 
  IoChevronBack,
  IoMoonOutline, 
  IoSunnyOutline,
  IoSettingsOutline } from "react-icons/io5";

  import { 
    // HiOutlineUserGroup,
    HiOutlineUser
  } from "react-icons/hi";



export const BottomNavbar = ({isDarkMode, setDarkMode}) => {

  const btnActions = [
    {
      title: 'Back',
      icon: <IoChevronBack/>,
      action: ()=>{}
    },
    {
      title: 'Toggle Dashboard',
      icon: <HiOutlineUser/>,
      action: ()=>{}
    },
    {
      title: 'Toggle Dark Mode',
      icon: isDarkMode ? <IoSunnyOutline/> : <IoMoonOutline/>,
      action: ()=>{
        setDarkMode(old=>!old)
      }
    },
    {
      title: 'Settings',
      icon: <IoSettingsOutline/>,
      action: ()=>{}
    }, 
    {
      title: 'Log Out',
      icon: '',
      action: ()=>{}
    },
  ]



  return (
    <Container>
      <Wrapper>
        {btnActions.map((btnInfo, i)=>{
          return <Btn key={i} onClick={()=>{btnInfo.action()}} name={btnInfo.title}>
                <BtnContent>{i === btnActions.length-1 ? btnInfo.title : ''}
                    {btnInfo.icon}
                </BtnContent>
          </Btn>
        })}
      </Wrapper>
    </Container>
  )
}


const Container = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1rem;
  scale: 1.2;
  transform-origin: bottom right;

  @media screen and (min-width: ${({theme}) => theme.breakpoint.md}){
    scale: 1.5;
  }

`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Btn = styled.button`
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid ${theme.icon} ${theme.borderThickness}`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .5rem;
  margin-left: .2rem;

	font: inherit;
	cursor: pointer;
	outline: inherit;

  display: grid;
  place-content: center;

  
`

const BtnContent = styled.div`
  color: ${({theme})=>theme.icon};
  display: grid;
  place-content: center;
  line-height: 1rem;
  font-size: 1rem;


`