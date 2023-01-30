import React, { useState,useEffect } from 'react';
import styled from "styled-components";

// import Thumbnail from '../imgs/thumbnail.png';
import { Link } from "react-router-dom";

import {format} from 'timeago.js';

import axios from 'axios';


export const VideoCard = ({data}) =>{

  const [username,setUsername] = useState('');

  useEffect(() => {
   
    const fetchUsername = async()=>{
      const res = await axios.get(`/users/find/${data.userId}`)
      const userNameResult = res.data.name;
      setUsername(userNameResult);
    }
    
    fetchUsername();
    return () => {}
  }, [])
  


  return(
    
      <CardContainer>
        <Link to={`../../video/${data._id}`}  style={{textDecoration: 'none', color: 'inherit'}}>
        <CardImage src={data.imgUrl}/>
        <Details>
            <CardTitle>{data.title}</CardTitle>
            <CardSubTitle>{username}</CardSubTitle>
            <span style={{flex:'2'}}/>
            <CardDate>{format(data.createdAt)}</CardDate>

        </Details>
        </Link>
      </CardContainer>
    
  )
}




const CardContainer = styled.div`
  position: relative;
  max-height: 250px;
  width: 30%;
  min-width: 215px;
  aspect-ratio: 1.3;
  background: ${({theme})=>theme.elementBG};
  /* border: solid transparent 2px; */
  border-radius: ${({theme})=>theme.borderRadius};
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  backdrop-filter: ${({theme})=>theme.blur};
  padding:2px; 

  

  &:hover{
    cursor: pointer;
    border: ${({theme})=>`solid ${theme.icon} 2px`};
    padding:2px; 


    img{
      filter: blur(4px);
      -webkit-filter: blur(4px);
      scale: 1;

    }

    div{
      margin: calc(.5rem + 0px);
      height: calc(100% - 1rem + 2px);
    }
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}){
   width: 45%;
    min-width: auto;

  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    min-width: auto;
  }
  
`

const Details = styled.div`
 margin: calc(.5rem + 2px);
 display: flex;
 flex-direction: column;
 height: calc(100% - 1rem - 2px);
 z-index: 5;
 filter:  ${({theme})=>theme.textShadow}; 
 /* text-shadow: ${({theme})=>theme.textShadow};  */
/* -webkit-filter: ; */
 /* color: ${({theme})=>theme.cardText}; ; */

`

const CardTitle = styled.h3`
  z-index: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;

  width: 100%;
  max-height: 3.5rem;
`

const CardSubTitle = styled.h5`
 z-index: 2;
 text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(217, 217, 217,1);


`

const CardDate = styled.h6`
 z-index: 2;

`

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: .55;
  border-radius: ${({theme})=>theme.borderRadius};
  scale: 1.05;
  

  filter: blur(8px);
  -webkit-filter: blur(8px);
  transition: filter ease-in .2s, scale ease-in .2s;


`
