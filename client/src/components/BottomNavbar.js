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

import { Link,useLocation } from "react-router-dom";

export const BottomNavbar = ({isDarkMode, setDarkMode}) => {
  const location = useLocation().pathname.split('/')[1];

  const isViewVideos = useLocation().pathname.split('/').includes('view');

  return (
    <>
    {!['signin','signup','forgot'].includes(location) && 

        <Container>
      <Wrapper>
        
        {location !== `/` && 
        <>
        {/* go back btn */}
        <Link to={isViewVideos ? "../.." : ".."} relative="path">
          <Btn name={'back'}>
            <BtnContent>
              <IoChevronBack/>
            </BtnContent>
          </Btn>
        </Link>


        {/* toggle dashboard view */}
        {location !== `/settings` && 
           <Link to={location === '/myvournals' ? 'subscribers': 'myvournals'}>
            <Btn name={'Toggle Dashboard'}>
              <BtnContent>
              {location === '/myvournals' ? <HiOutlineUserGroup/> : <HiOutlineUser/>}
              </BtnContent>
            </Btn>
          </Link>
        }
       

          </>}
     
        {/* toggle dark mode */}
        <Btn name={'Toggle Dark Mode'}
            onClick={(e)=>{setDarkMode(old=>!old)}} >
          <BtnContent>
            {isDarkMode ? <IoSunnyOutline/> : <IoMoonOutline/>}
          </BtnContent>
        </Btn>

        {/* settings */}
        {/* <Link to='settings'>
          <Btn name={'Settings'}>
            <BtnContent>
                <IoSettingsOutline/>
            </BtnContent>
          </Btn>
        </Link> */}

    

        {/* log out */}
        <Link to={'signin'}
          style={{textDecoration: 'none'}}>
          <Btn name={'Log Out'}>
            <BtnContent>Log Out</BtnContent>
          </Btn>
        </Link>
      </Wrapper>
    </Container>
  
  }
  </>
  )
}


const Container = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
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