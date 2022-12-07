import React from 'react';
import styled from "styled-components";

import { Link,useLocation } from "react-router-dom";


const SignIn = () => {
  const location = useLocation().pathname;
  

  return (
    <Container>

      {/* SIGN IN VIEW */}
       {location === '/signin' && 
        <Wrapper>
          <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
          <SubTitle>Sign In</SubTitle>
          <Input placeholder='username'/>
          <Input type="password" placeholder='password'/>

          <Link to={'/'}>
            <Button>Sign In</Button>
          </Link>

          <div style={{flex:'2'}}></div>

          <BtnHolder>
            <TextBtn to={"/signup"}>Sign Up</TextBtn>
            <TextBtn to={"/forgot"}>Forgot Password</TextBtn>      
          </BtnHolder>
        </Wrapper>}

        {/* SIGN UP VIEW */}
       {location === '/signup' && 
        <Wrapper>
          <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
          <SubTitle>Sign Up</SubTitle>
          <Input placeholder='username'/>
          <Input placeholder='email'/>
          <Input type="password" placeholder='password'/>
          <Input type="password" placeholder='re-enter password'/>

          <Button>Sign Up</Button>

          <div style={{flex:'2'}}></div>

          <BtnHolder>
              <TextBtn to={"/signin"}>sign in instead</TextBtn>
          </BtnHolder>
        
        </Wrapper>}

         {/* FORGOT PASSWORD VIEW */}
       {location === '/forgot' && 
        <Wrapper>
          <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
          <SubTitle>Forgot Password</SubTitle>
          <Input placeholder='email'/>
          <Button>Send</Button>

          <div style={{flex:'2'}}></div>
          
          <BtnHolder>   
            <TextBtn to={"/signin"}>sign in instead</TextBtn>
          </BtnHolder>
        
        </Wrapper>}
     
     {/* BOTTOM LINKS */}
      <More>
        <Links>Help</Links>
        <Links>Privacy</Links>
        <Links>Terms</Links>
      </More>
    </Container>
  )
}

export default SignIn



const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media screen and (min-height: 700px){
    justify-content: center;
  }
`

const Wrapper = styled.div`
  width: 280px;
  margin-top: 1.5rem;
 
  background: ${({theme})=>theme.elementBG};
	/* border: ${({theme})=>`solid ${theme.icon} ${theme.borderThickness}`}; */
	border: ${({theme})=>`solid ${theme.icon} 0px`};

  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
  padding: 2rem 3rem;

  @media screen and (min-height: 700px){
     margin-top: none;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
     width: 240px;

  }

`

const Title = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 2.25rem;
    margin-bottom: .5rem;

  }
`

const SubTitle = styled.h1`
  font-weight: 300;
  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 1.75rem;
  }

`

const Input = styled.input`
  width: 80%;
  padding: 10px;
  color:${({theme})=>theme.btnText};
  background: ${({theme})=>theme.inputBG};
	/* border: ${({theme})=>{ return `solid ${theme.icon} ${theme.borderThickness}}`}}; */
	border-color: ${({theme})=> theme.icon };
	border-width: ${({theme})=> theme.borderThickness };
	border-width: 0px;

  border-style: solid;

  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  
  font-size:1rem;

  &::placeholder{
    color:${({theme})=>theme.btnText};  
  }

  /* &:focus{
    border:inherit;
  } */

`

const Button = styled.button`
  font-size:1rem;
  color:${({theme})=>theme.btnText};  
  background: ${({theme})=>theme.button};
	/* border: ${({theme})=>`solid transparent  ${theme.borderThickness}`}; */
  border-color: transparent;
	border-width: 2px;
  border-style: solid;


  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  padding: 10px 20px;

  &:hover{
    cursor: pointer;
	   border-color: white;



  }

`

const TextBtn = styled(Link)`
  color:${({theme})=>theme.btnText};
  text-decoration: none;
  padding: 5px 10px;

  &:hover{
    background: ${({theme})=>theme.hoverBG};
    border-radius: ${({theme})=>theme.borderRadius};
    backdrop-filter: ${({theme})=>theme.blur};

  }

`


const BtnHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const More = styled.div`
  margin-top: .25rem;
  width: 320px;
  display: flex;
  justify-content: center;
  gap: 2px;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    width: 280px;
  }

`

const Links = styled.button`
    background: none;
    color:${({theme})=>theme.btnText};
    border: none;
    padding: 5px 10px;


   &:hover{
    cursor: pointer;
    background: ${({theme})=>theme.hoverBG};
    border-radius: ${({theme})=>theme.borderRadius};
    backdrop-filter: ${({theme})=>theme.blur};
  }

    @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 12px;
  }

`