import React from 'react';
import styled from "styled-components";

import Button from '../components/Button';

import {
  Link,
} from "react-router-dom";


const Error = () => {
  return (
    <Container>
       <Title>404</Title>
       <Subtitle>The page you were looking for does not exist.</Subtitle>

        <BtnWrap to={'/'}>
          <Button active={true}>Go back Home</Button>
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
  width: 200px;
  margin: 2rem auto;

`