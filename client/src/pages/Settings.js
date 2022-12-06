import React from 'react';
import styled from "styled-components";

// import { Link,useLocation } from "react-router-dom";


const Settings = () => {
  return (
   <Container>
      <Wrapper>
    
    </Wrapper>
   </Container>
  )
}

export default Settings



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;

`

const Wrapper = styled.main`
  width: calc(100% - 2rem);
  max-width: 1000px;
  height: calc(100% - 9rem);

  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid ${theme.icon} ${theme.borderThickness}`};
  border-radius: ${({theme})=>theme.borderRadius};

  @media screen and (min-width: ${({theme}) => theme.breakpoint.sm}){
    height: calc(100% - 10rem);
  } 
`