import React,{useState,useEffect} from 'react';
import styled from "styled-components";

import { IoSettingsOutline } from "react-icons/io5";
import { 
    HiOutlineUserGroup,
    HiOutlineUser
  } from "react-icons/hi";

import { Link } from "react-router-dom";


const Home = () => {

  const [iconSize, setIconSize] = useState(64);

  useEffect(()=>{

    const resize = ()=>{
      if((0 < window.innerWidth < 400) || window.innerWidth > 1000){
        setIconSize(64);
      }else{
        setIconSize(48);
      }
    }

    resize();
    window.addEventListener("resize", resize);


    return ()=>{window.removeEventListener("resize", resize);}
  },[]);


  return (
    <>
      <Title>VRNL</Title>
      <Container>
        <Wrapper>

          {/* my vournals page */}
          <div>
            <Link to="myvournals">
              <Btn name={'vournals'}>
                <BtnContent>
                  <HiOutlineUser size={iconSize}/>
                </BtnContent>
              </Btn>
            </Link>
            <BtnTitle>My Vournals</BtnTitle>
          </div>


          {/* subscriber page */}
          <div>
            <Link to="subscribers">
              <Btn name={'Subscribers'}>
                <BtnContent>
                  <HiOutlineUserGroup size={iconSize} style={{paddingTop:'0px'}} />
                </BtnContent>
              </Btn>
            </Link>
          <BtnTitle>Subscibers</BtnTitle>
          </div>

          {/* settings */}
          <div>
            <Link to="settings">
              <Btn name={'Settings'}>
                <BtnContent>
                  <IoSettingsOutline size={iconSize}/>
                </BtnContent>
              </Btn>
            </Link>
            <BtnTitle>Settings</BtnTitle>
          </div>

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
`

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
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
	border: ${({theme})=>`solid ${theme.icon} ${theme.borderThickness}`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .5rem;
  margin: 0 1rem;

	font: inherit;
	cursor: pointer;
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