import React from 'react';
import styled from "styled-components";


import {
  Link,
} from "react-router-dom";


const Error = () => {
  return (
    <Container>
       <Title>404</Title>
       <Subtitle>The page you were looking for does not exist.</Subtitle>

        <BtnWrap to={'/'}>
          <Btn active={true} inverse={true}>Go back Home</Btn>
        </BtnWrap>
    </Container>
  )
}

export default Error

const Container = styled.main`
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin: 0 auto;
`

const Title = styled.h1`

  margin: 1rem;
  font-size: 3rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  /* text-align: center; */

`

const Subtitle = styled.p`

  margin: 0 1rem;
  font-size: 2rem;
  line-height: 120%;
  /* text-align: center; */
`

const BtnWrap = styled(Link)`
  all: unset;
  /* width: 200px; */
  margin: 2rem auto;

`

const Btn = styled.button`
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .75rem;

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

   color: ${({theme})=>theme.icon};
   display: grid;
  place-content: center;
  line-height: 1.5rem;
  font-size: 1.25rem;
  
`
