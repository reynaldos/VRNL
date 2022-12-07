import React from 'react';
import styled from "styled-components";

import {PageButton} from '../components/PageButton';
import {HiOutlineEye, HiOutlineVideoCamera} from "react-icons/hi2";


export const ViewVideos = () => {
  return (
    <div>View Videos</div>
  )
}

export const MainDisplay = () => {

  const btns = [
    { name: 'Record',
      path: 'record',
      Icon: HiOutlineVideoCamera 
    },
    { name: 'View Collection',
      path: 'view/test',
      Icon: HiOutlineEye
    }]


  return (
     <MainWrapper>
      {btns.map((btn,i)=>{
      return<PageButton key={i} info={btn}/>
      })}

    </MainWrapper>
  )
}



const MainWrapper = styled.div`
  height: 100%;
  width: 100%; 
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  outline: 1px blue solid;
`

