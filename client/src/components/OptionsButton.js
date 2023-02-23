import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import { useLocation } from "react-router-dom";

export const OptionsButton = ({btnList, left}) => {
    const [isOpen, setIsOpen] = useState(false);

    const pathList =  useLocation().pathname;

    useEffect(() => {
      setIsOpen(false);
  
    }, [pathList])
    

    return (
    <div style={{position:'relative'}}>
        <OptionsIcon isOpen={isOpen} onClick={()=>{setIsOpen(old => !old)}}><span/><span/><span/> </OptionsIcon>
        
        {/* {isOpen && <OptionsWrapper>
        <OptionsList>
            <OptionsBtn>Rename</OptionsBtn>
            <OptionsBtn>Combine</OptionsBtn>
            <OptionsBtn style={{color:'red'}}>Delete</OptionsBtn>
        </OptionsList>
        </OptionsWrapper>} */}

         {isOpen && <OptionsWrapper left={left}>
        <OptionsList>
            {btnList.map((btn, index)=>{
                return <OptionsBtn 
                            key={index} 
                            alt={btn.title}
                            onClick={btn.action}
                            style={{color: `${btn.title === 'delete' ? 'red' : ''}`}}
                            >{btn.title}</OptionsBtn>
            })}
        </OptionsList>
        </OptionsWrapper>}


    </div>
    )
}



const OptionsIcon = styled.button`
  position: relative;
  height: 50%;
  aspect-ratio: 1;

  background: ${({theme})=>theme.elementBG};
	border: solid transparent 2px;
  border-radius: ${({theme})=>theme.borderRadius};

  border-radius: 100%; 

  display: flex;
  align-items: center;
  justify-content: center;
  padding: .2rem;

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

    ${({isOpen})=>{
    if(isOpen)
      return `
        // mix-blend-mode: color-burn;

         &:hover{
          cursor: pointer;
          border: solid transparent 2px;
      }
      
      `
  }}


  
`
const OptionsWrapper = styled.div`
  margin: 0 .5rem;
  top: .5rem;

  ${({left})=>{
    return left ? 
    `
     right: 100%;
     transform-origin: top right;
    ` : 
    `
      left: 100%;
      transform-origin: top left;
    `
  }};
 

  position: absolute;
  background: ${({theme})=>theme.elementBG};
	/* border: solid transparent 2px; */
  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  z-index: 20;
  overflow: hidden;

`

const OptionsList = styled.ul`
padding: 0px;
margin:0px;
list-style: none;


`

const OptionsBtn = styled.li`
  padding: .5rem 1rem;
  color: ${({theme})=>theme.icon};
  text-align: center;

  

  border-bottom: ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};

  &:last-child{
    border-bottom:none;
  }

 &:hover{
    cursor: pointer;
    background-color: rgba(255,255,255, .35);
  }

`