import React, {useEffect,useState} from 'react';
import styled from "styled-components";
import { VideoCard } from './VideoCard';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFailure } from "../redux/collectionSlice";

import {
  useLocation
} from "react-router-dom";


import {LoadingIcon} from './LoadingIcon';

export const ViewVideos = () => {
  const { currentCollection, loading } = useSelector(state=>state.collection);
  const collectionId = useLocation().pathname.split('/').pop();

  const dispatch = useDispatch();


  useEffect(()=>{

     const fetchVideos = async () =>{
      try {

        // only fetch if collection not already loaded
        if (collectionId !== currentCollection.collectionId){
          dispatch(fetchStart());
          const foundVideos = await axios.get(`/videos/sub/${collectionId}`)
          dispatch(fetchSuccess({videos: foundVideos.data, collectionId}));
        }
      } catch (error) { 
         dispatch(fetchFailure());
      }
    }
    fetchVideos();
  },[]);


  return (
      <Container>
     {loading ? <Wrapper><LoadingIcon/></Wrapper> : 
     
    //  finished loading
     <Wrapper>
        {currentCollection.videos?.map((value,index)=>{
          return <VideoCard key={index} data={value}/>    
        })}
      
      {/* show message if no video */}
        {currentCollection.videos.length === 0 &&
         <NoVideoContainer>
          <NoVideoTitle>No videos added to this collection!</NoVideoTitle>
          </NoVideoContainer>}
      </Wrapper>}
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




const NoVideoContainer = styled.main`
  flex: 3.5;
  height: calc(100% - 5rem);
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  position: relative;

`


const NoVideoTitle = styled.h1`
  margin: auto .5rem;
  line-height: 2rem;
  
    position:relative;
    top: -40px;
    width: 80%;
    text-align: center;
    background: ${({theme})=>(theme.elementBG)};

    border: ${({theme})=>(`solid 2px ${theme.border}`)};
    border-radius: ${({theme})=>(theme.borderRadius)};


    padding: .75rem;
    color:white;
    
`