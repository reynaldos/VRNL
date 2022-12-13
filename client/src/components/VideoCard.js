import React from 'react';
import styled from "styled-components";

import Thumbnail from '../imgs/thumbnail.png';
import { Link } from "react-router-dom";


export const VideoCard = () =>{
  return(
    
      <CardContainer>
        <Link to='video/testVideoId'  style={{textDecoration: 'none', color: 'inherit'}}>
        <CardImage src={Thumbnail}/>
        <Details>
            <CardTitle>Video 1</CardTitle>
            <CardSubTitle>reysanxez</CardSubTitle>
            <span style={{flex:'2'}}/>
            <CardDate>1 day ago</CardDate>

        </Details>
        </Link>
      </CardContainer>
    
  )
}




const CardContainer = styled.div`
  position: relative;
  /* height: 160px; */
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
      filter: blur(0px);
      -webkit-filter: blur(0px);
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
 /* filter: drop-shadow(-2px 2px 5px #000); */
 text-shadow: 1px 1px 10px #000;
 /* color: ${({theme})=>theme.cardText}; ; */

`

const CardTitle = styled.h3`
 z-index: 2;

`

const CardSubTitle = styled.h5`
 z-index: 2;

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
  

  filter: blur(4px);
  -webkit-filter: blur(4px);
  transition: filter ease-in .2s, scale ease-in .2s;


`
