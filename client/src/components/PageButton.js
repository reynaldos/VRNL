import React,{useState,useEffect, forwardRef} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";



export const PageButton = forwardRef((props, ref) => {
    const { name,path,Icon, disabled } = props.info;

    const [iconSize, setIconSize] = useState(64);

    useEffect(()=>{
        const resize = ()=>{
        if((0 < window.innerWidth < 400) || window.innerWidth > 1000){
            setIconSize(64);
        }else{
            setIconSize(48);
        }
    }

    resize();
    window.addEventListener("resize", resize);


    return ()=>{window.removeEventListener("resize", resize);}
  },[]);

  return (<div>
      <Link to={disabled ? null : path} ref={ref}>
          <Btn name={name} disabled={disabled} >
            <BtnContent>
                <Icon size={iconSize}/>
            </BtnContent>
          </Btn>
      </Link>
      <BtnTitle>{name}</BtnTitle>
     </div>
  )
});


const Btn = styled.button`
  width: 200px;
  aspect-ratio: 1;
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 4px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .5rem;
  margin: 0 1rem;

	font: inherit;
	
	outline: inherit;

  display: flex;
  align-items:center;
  justify-content:center;
  backdrop-filter: ${({theme})=>theme.blur};


  @media screen and (max-width: ${({theme}) => `calc(${theme.breakpoint.md} + 100px)`}){
   width: 136px;
  }

   @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
   width: 108px;
  }


  &:hover{
    cursor: pointer;
     border: ${({theme})=>`solid ${theme.icon} 4px`};
  }


  &:disabled{
    cursor: default;
    border: solid transparent 4px;
    filter: brightness(70%);
    -webkit-filter:brightness(70%);
  }
  
`

const BtnContent = styled.div`
  color: ${({theme})=>theme.icon};
  display: grid;
  place-content: center;
  line-height: 1rem;
  font-size: 1rem;
`

const BtnTitle = styled.h4`
  margin-top: .25rem;
  text-align: center;
  margin-bottom: 1.25em;


  @media screen and (min-width: ${({theme}) => theme.breakpoint.md}){
   font-size: 1.4rem;
  }
`