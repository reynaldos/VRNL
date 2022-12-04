import React from 'react';
import styled from "styled-components";
import { SideMenu } from '../components/SideMenu';


const Dashboard = () => {
  return (
    <Container>
     
       <SideMenu/>

        <Main>

           <Wrapper>
             Main Contents
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
  background-color: rgba(0,255,0,.2);
  height: 100%;
`

const Wrapper = styled.div`


`




