import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import { 
  IoChevronBack,
  IoMoonOutline, 
  IoSunnyOutline,
  // IoSettingsOutline 
} from "react-icons/io5";

  import { 
    HiOutlineUserGroup,
    HiOutlineUser,
    HiOutlineMenu
  } from "react-icons/hi";

import { Link,useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";


export const BottomNavbar = ({isDarkMode, setDarkMode, setSideMenuController,sideMenuController}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentVideo } = useSelector(state=>state.video);


  const pathList =  useLocation().pathname.split('/');
  const location = pathList[1];
  const isViewCollection = pathList.includes('collection');
  const isViewVideo = pathList.includes('video');
  const record = pathList.includes('record');

 const [backPath, setBackPath] = useState('');
//  const [isOpen, seIsOpen] = useState(false);

  useEffect(()=>{

    if(isViewCollection || record){
      setBackPath("../..");
    } else if(isViewVideo){
      setBackPath(`/${location}/collection/${currentVideo.collectionId}`);
    }else{
      setBackPath("..");
    }

  },[pathList])


  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout());
     navigate('/signin');
  }

  return (
    <>
    {!['signin','signup','forgot'].includes(location) && 
    <Container>

      {sideMenuController.isMobile ? <Wrapper><Btn 
            name={'Hamburger'}
            onClick={(e)=>{
              setSideMenuController(old=>({...old, isOpen: !old.isOpen}))
            }} 
            isHam={true}>
          <BtnContent>
           <HiOutlineMenu/>
          </BtnContent>
        </Btn></Wrapper> : 
  
      <Wrapper>
        
        {location !== `` && 
        <>
          {/* go back btn */}
          <Link 
            // style={{height: 'inherit'}}
            to={backPath} relative="path">
            <Btn name={'back'}>
              <BtnContent>
                <IoChevronBack/>
              </BtnContent>
            </Btn>
          </Link>


          {/* toggle dashboard view */}
          {location !== `settings` && 
            <Link 
              // style={{height: 'inherit', boxSizing:'inherit'}}
              to={location === 'myvournals' ? 'subscribers': 'myvournals'}>
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



      </Wrapper>}
    </Container>
  
  }
  </>
  )
}


const Container = styled.nav`
  position: fixed;
  top: 0;
  margin-top: 1rem;
  height: 3rem;
  width: 100%;
  /* outline: 1px blue green; */
  display: grid;
  place-items: center;

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
  width: calc(100% - 2rem);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* outline: 1px blue solid; */

  /* flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px; */
/* flex-wrap: wrap; */

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