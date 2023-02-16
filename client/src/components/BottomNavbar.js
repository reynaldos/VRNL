import React,{useEffect, useState, useRef, useMemo} from 'react';
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


export const BottomNavbar = ({isDarkMode, setDarkMode}) => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentVideo } = useSelector(state=>state.video);

  // nav buttons setup
  const pathList =  useLocation().pathname.split('/');
  const location = pathList[1];
  const isViewCollection = pathList.includes('collection');
  const isViewVideo = pathList.includes('video');
  const record = pathList.includes('record');
 const [backPath, setBackPath] = useState('');

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

  // hamburger <-> side menu
  const [isOpen, setIsOpen] = useState(false);
  const navItemsRef = useRef();
  const hamburgerRef = useRef();




  useEffect(()=>{

    const checkWidth = ()=>{
      if(window.innerWidth > 767){
        navItemsRef.current.style.marginTop = '0rem';
        hamburgerRef.current.style.display = 'none';
        navItemsRef.current.style.display = 'flex';

      }else{
        hamburgerRef.current.style.display = 'flex';
        navItemsRef.current.style.marginTop = '.5rem';
        navItemsRef.current.style.display = 'none';
      }
    }

    if(navItemsRef.current && hamburgerRef.current){ checkWidth()} else{
      setTimeout(() => {
         if(navItemsRef.current && hamburgerRef.current) checkWidth();
      }, 25);
    };
    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
      }
  },[]);

  const toggleNav = () =>{
     setIsOpen(oldVal => !oldVal);
  }

useEffect(() => {
  if(navItemsRef.current){
    if(isOpen || window.innerWidth > 767){
      navItemsRef.current.style.display = 'flex';
    }else{
      navItemsRef.current.style.display = 'none';
    }
  }

  }, [isOpen])

  useMemo(() => {
    setIsOpen(false);
    return null;
  }, [location]);
  

  return (
    <>
    {!['signin','signup','forgot'].includes(location) && 
    <Container>


      <Wrapper ref={hamburgerRef}>
        <Btn 
            name={'Hamburger'}
            onClick={toggleNav} 
            isHam={true}>
          <BtnContent>
           <HiOutlineMenu/>
          </BtnContent>
        </Btn>
      </Wrapper>
  
      {/* btn system */}
      <Wrapper ref={navItemsRef} >

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
              // to={location === 'myvournals' ? 'subscribers': 'myvournals'}>
              to={null}>
              <Btn name={'Toggle Dashboard'} disabled={true}>
                <BtnContent>
                {location === 'myvournals' ? <HiOutlineUserGroup/> : <HiOutlineUser/>}
                </BtnContent>
              </Btn>
            </Link>}
        </>}
     
        {/* toggle dark mode */}
        <Btn name={'Toggle Dark Mode'}
            onClick={setDarkMode} >
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
  top: 0;
  margin-top: 1rem;
  height: 3.5rem;
  width: 100%;
  /* outline: 1px blue solid; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: flex-start; */
    /* transition: height .5s ease; */
    /* overflow: hidden; */
}

`

const Wrapper = styled.div`
/* position: relative; */
  width: calc(100% - 2rem);
  margin: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* outline: 1px green solid; */
  pointer-events: none;
  /* height: 3rem; */

@media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    transform-origin: top center;
    gap: .5rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    transition: height .5s ease;
    /* overflow: hidden; */
}


`

const Btn = styled.button`
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .75rem;
  margin-left: .2rem;
  pointer-events: auto;
  

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

   &:disabled {
      cursor: default;
      border: solid transparent 2px;
      filter: brightness(70%);
      -webkit-filter: brightness(70%);
  }
`


const BtnContent = styled.div`
  color: ${({theme})=>theme.icon};
  display: grid;
  place-content: center;
  line-height: 1.5rem;
  font-size: 1.5rem;
  
`