import React from 'react';
import styled from "styled-components";
import { SideMenu } from '../components/SideMenu';
import { ViewVideos } from '../components/ViewCollection';
import { MainDisplay } from '../components/MainDisplay';

import Record from './Record';
import VideoPage from './VideoPage';

import { HiOutlineVideoCamera} from "react-icons/hi2";



import {
  Route,
  Routes,useLocation
} from "react-router-dom";

const Dashboard = ({type}) => {
  const location = useLocation().pathname.split('/').pop();
  
  return (
    <Container>
     
     {location !== 'record' &&
      <SideMenu type={type} /> }

      <Main>
        {location !== 'record' ?
        // defaut title
        <TitleWrap>
          <Title>tab 1</Title>
          <Options/>
        </TitleWrap>:

        // record title
         <TitleWrap>
          <HiOutlineVideoCamera size={48} style={{paddingTop:'.5rem'}}/>
          <Title>tab 1</Title>
        </TitleWrap>
        }

        <Routes>
          <Route path="/">
            <Route index element={<MainDisplay/>}/>
                <Route path="collection">
                  <Route path=":collectionId">
                        <Route index element={<ViewVideos/>}/>
                          <Route path="video">
                            <Route path=":videoId" element={<VideoPage/>}/>
                        </Route>
                    </Route>             
            </Route>

           

             <Route path="record" element={<Record/>}/>
          </Route>
        </Routes>
      </Main>
    </Container>
 
  )
}

export default Dashboard

const Options = () => {
  return (
    <OptionsContainer><span/><span/><span/></OptionsContainer>
  )
}



const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;

` 

const Main = styled.main`
  flex: 3.5;
  height: calc(100% - 5rem);
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  position: relative;

  /* outline: 1px solid black; */
`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;

`

const Title = styled.h1`
  margin: auto .5rem;
  font-size: 2.5rem;

`

const OptionsContainer = styled.button`
  height: 50%;
  aspect-ratio: 1;

  background: ${({theme})=>theme.elementBG};
	border: solid transparent 2px;
  border-radius: ${({theme})=>theme.borderRadius};

  border-radius: 100%; 

  display: flex;
  align-items: center;
  justify-content: center;

  span{
    width: 4px;
    height: 4px;
    background-color: ${({theme})=>theme.icon};
    border-radius: 100%;
    margin: auto .075rem;
  }

   &:hover{
    	cursor: pointer;
      border: ${({theme})=>`solid ${theme.icon} 2px`};
  }

  
`
