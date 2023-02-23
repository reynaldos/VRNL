import React from 'react';
import styled from "styled-components";

import {PageButton} from './PageButton';
import {HiOutlineEye, HiOutlineVideoCamera} from "react-icons/hi2";

export const MainDisplay = ({selectedTab}) => {

  const btns = [
    { name: 'Record',
      path: `record/${selectedTab._id}`,
      Icon: HiOutlineVideoCamera 
    },
    { name: 'View Collection',
      path: `collection/${selectedTab._id}`,
      Icon: HiOutlineEye
    }]


  return (
    <Container>
     <Wrapper>
        {btns.map((btn,i)=>{
        return<PageButton key={i} info={btn}/>
        })}

      </Wrapper>
    </Container>
  )
}




const Container = styled.section`
  flex: 2;
  height: 100%;
  width: 100%; 
  height: auto;
  display: grid;
  place-content: center;
  margin: 1rem;

`

const Wrapper = styled.div`
  flex: 2;
  height: 100%;
  width: 100%; 
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

