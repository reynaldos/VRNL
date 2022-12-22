import React from 'react';
import styled from "styled-components";


export const LoadingIcon = () => {
  return (
        <Wrapper>
            <Icon/>
        </Wrapper>
  )
}


const Wrapper = styled.div`
    align-self: center;
    justify-self: center;
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
`

const Icon = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: ${({theme})=>`6px solid ${theme.elementBG}`};
    border-radius:100%; 
    border-top-color: ${({theme})=>theme.icon};
    border-left-color: ${({theme})=>theme.icon};
    border-right-color: ${({theme})=>theme.icon};
    border-style: dotted;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    rotate: 0deg;


   @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @-webkit-keyframes spin {
        to {
          -webkit-transform: rotate(360deg);
        }
      }
`