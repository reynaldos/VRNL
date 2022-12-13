import React from 'react';
import styled from "styled-components";
import { VideoCard } from './VideoCard';

export const ViewVideos = () => {
  return (
      <Container>
     <Wrapper>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>   
        <VideoCard/>    
        <VideoCard/>    
        <VideoCard/>    
        <VideoCard/>    

      </Wrapper>
    </Container>
  )
}



const Container = styled.section`
  flex: 2;
  height: 100%;
  width: 100%; 
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  overflow: hidden;

`

const Wrapper = styled.div`
  flex: 2;
  width: calc(100% - 2rem); 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 1000px;
  overflow: auto;

  padding: 1rem;
  gap: 1rem;

  padding-bottom: 20%;
  -webkit-mask-image: linear-gradient(transparent, black 10%, black 70% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 70% ,transparent);


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
      width: calc(100% - 1rem); 
  padding: 0rem;


  }


 /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({theme})=>theme.elementBG};
    opacity: .25;
    transform: translateX(5px);

  }

  /* Track */
  ::-webkit-scrollbar-track:hover {
    opacity: 1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({theme})=>theme.button};
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }
  

`
