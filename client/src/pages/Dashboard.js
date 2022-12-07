import React from 'react';
import styled from "styled-components";
import { SideMenu } from '../components/SideMenu';
import {ViewVideos, MainDisplay} from '../components/DashMainComps';

import Record from '../pages/Record';

import {
  Route,
  Routes,useLocation
} from "react-router-dom";

const Dashboard = ({type}) => {
  const location = useLocation().pathname.split('/').pop();
  
  return (
    <Container>
     
     {location !== 'record' &&
      <SideMenu type={type} />
     }

      <Main>
        <Routes>
          <Route path="/">
            <Route index element={<MainDisplay/>}/>
            <Route path="view">
                <Route path=":collectionId" element={<ViewVideos/>}/>
            </Route>
             <Route path="record" element={<Record/>}/>
          </Route>
        </Routes>
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
  height: calc(90% - 4rem);
  width: 100%;
  display: flex;
`



