import React from 'react';
import styled from "styled-components";
import { SideMenu } from '../components/SideMenu';



const Dashboard = ({type}) => {



  return (
    <Container>
     
       <SideMenu type={type} />

        <Main>
           <Wrapper>
             Main Content
           </Wrapper>
       </Main>
    </Container>
 
  )
}

export default Dashboard


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
 
` 

const Main = styled.main`
  flex: 3;
  /* outline: 1px red solid; */
  height: 100%;
  width: 100%;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

`




