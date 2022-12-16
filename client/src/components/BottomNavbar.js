import React from 'react';
import styled from "styled-components";
import { 
  IoChevronBack,
  IoMoonOutline, 
  IoSunnyOutline,
  // IoSettingsOutline 
} from "react-icons/io5";

  import { 
    HiOutlineUserGroup,
    HiOutlineUser
  } from "react-icons/hi";

import { Link,useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export const BottomNavbar = ({isDarkMode, setDarkMode}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation().pathname.split('/')[1];

  const isViewCollection = useLocation().pathname.split('/').includes('collection');
  const isViewVideo = useLocation().pathname.split('/').includes('video');

  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout());
     navigate('/signin');
  }

  return (
    <>
    {!['signin','signup','forgot'].includes(location) && 
    <Container>
      <Wrapper>
        
        {location !== `` && 
        <>
          {/* go back btn */}
          <Link to={isViewCollection || isViewVideo ? "../.." : ".."} relative="path">
            <Btn name={'back'}>
              <BtnContent>
                <IoChevronBack/>
              </BtnContent>
            </Btn>
          </Link>


          {/* toggle dashboard view */}
          {location !== `settings` && 
            <Link to={location === 'myvournals' ? 'subscribers': 'myvournals'}>
              <Btn name={'Toggle Dashboard'}>
                <BtnContent>
                {location === 'myvournals' ? <HiOutlineUserGroup/> : <HiOutlineUser/>}
                </BtnContent>
              </Btn>
            </Link>}
        </>}
     
        {/* toggle dark mode */}
        <Btn name={'Toggle Dark Mode'}
            onClick={(e)=>{setDarkMode(old=>!old)}} >
          <BtnContent>
            {isDarkMode ? <IoSunnyOutline/> : <IoMoonOutline/>}
          </BtnContent>
        </Btn>

        {/* log out */}
          <Btn name={'Log Out'} onClick={handleLogout}>
            <BtnContent>Log Out</BtnContent>
          </Btn>
      </Wrapper>
    </Container>
  
  }
  </>
  )
}


const Container = styled.nav`
  position: fixed;
  right: 0;
  top: 0;
  margin: 1rem;
  height: 3rem;
  /* scale: 1.5; */
  /* transform-origin: bottom right; */
/* 
  @media screen and (min-width: ${({theme}) => theme.breakpoint.sm}){
    scale: 1.5;
  }

   @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    scale: 1.5;
  } */

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
	border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .75rem;
  margin-left: .2rem;

	font: inherit;

	outline: inherit;

  display: flex;
  align-items:center;
  justify-content:center;
 
  backdrop-filter: ${({theme})=>theme.blur};

  &:hover{
    	cursor: pointer;
      border: ${({theme})=>`solid ${theme.icon} 2px`};
       /* background-color: rgba(255,255,255, .5) */
  }
  
`

const BtnContent = styled.div`
  color: ${({theme})=>theme.icon};
  display: grid;
  place-content: center;
  line-height: 1.5rem;
  font-size: 1.5rem;
`