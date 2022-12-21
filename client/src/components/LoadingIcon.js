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
`

const Icon = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: ${({theme})=>`6px solid ${theme.elementBG}`};
    border-radius:100%; 
    border-top-color: ${({theme})=>theme.icon};
    border-bottom-color: ${({theme})=>theme.icon};
    border-style: dotted;
    animation: spin 1.5s ease-in-out infinite;
    -webkit-animation: spin 1.5s ease-in-out infinite;
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