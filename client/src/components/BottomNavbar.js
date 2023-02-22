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

  useEffect(()=>{

    const checkWidth = ()=>{
      if(window.innerWidth > 767){
        setIsOpen(true)
      }else{
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
      }
  },[]);

  const toggleNav = () =>{
     setIsOpen(oldVal => !oldVal);
  }

  useMemo(() => {
    setIsOpen(false);
    return null;
  }, [location]);
  

  return (
    <>
    {!['signin','signup','forgot'].includes(location) && 
    <Container>


      <HamWrapper>
        <Btn 
            name={'Hamburger'}
            onClick={toggleNav} 
            isHam={true}>
          <BtnContent>
           <HiOutlineMenu/>
          </BtnContent>
        </Btn>
      </HamWrapper>
  
      {/* btn system */}
      <ItemsWrapper isOpen={isOpen} ref={navItemsRef} >

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

      </ItemsWrapper>

    </Container>

  }
  </>
  )
}


const Container = styled.nav`
  position: fixed;
  bottom: 0;
  margin: 1rem 0;
  height: 3.5rem;
  width: 100%;
  /* outline: 1px blue solid; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;

`

const HamWrapper = styled.div`
  margin: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  display: none;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    display: block;
  }
`
const ItemsWrapper = styled.div`
  position: absolute;

  width: calc(100% - 2rem);
  margin: 0 1rem;
  height: 100%;
  display: flex;
  margin-top: 0rem;

  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  transition: none;


@media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    bottom: 3.5rem;
    transform-origin: bottom center;
    gap: .5rem;
    margin-bottom: .5rem;

    height: ${({isOpen})=> isOpen ? '450%' : '0%'};


    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    transition: height .5s ease;

    overflow: hidden;

     -webkit-mask-image: linear-gradient(transparent, black 10px, black 100% );
    mask-image: linear-gradient(transparent, black 10px, black 100%);
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