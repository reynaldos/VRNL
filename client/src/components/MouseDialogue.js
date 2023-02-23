import React, { useState, useEffect, useRef,  forwardRef} from 'react';
import styled from "styled-components";


export const MouseDialogue = ({text, containerRef}) => {

  const dialogueRef = useRef();

  const followMouse = (e) => {
      var cursor = dialogueRef.current;

      var mouseX = e.clientX;
      var mouseY = e.clientY;
      cursor.style.left = (mouseX - 55) + "px";
      cursor.style.top = (mouseY - 55) + "px";
    }


  useEffect(()=>{
    console.log('test')
    // setInterval(()=>{
      window.addEventListener("mousemove", followMouse);
      containerRef.current.addEventListener("mouseenter", function(){ dialogueRef.current.style.visibility = 'visible'; });
      containerRef.current.addEventListener("mouseleave", function(){ dialogueRef.current.style.visibility = 'hidden'; });
    // },500)

    const eventRemover = ()=>{
      window.removeEventListener("mousemove", followMouse);
      containerRef.current.removeEventListener("mouseenter", function(){ dialogueRef.current.style.visibility = 'visible'; });
      containerRef.current.removeEventListener("mouseleave", function(){ dialogueRef.current.style.visibility = 'hidden'; });
    }
  
    return eventRemover;

  },[])


  return (
    <Wrap ref={dialogueRef}>
        {/* <Info>{text}</Info> */}
    </Wrap>
  )
}


const Wrap = styled.div`
  height: 50px;
  width: 100px;
  position: absolute;
  z-index: 9999999;
  pointer-events: none; /* pointer-events: none is needed */
  /* cursor: none;*/
  background-color: white; 
  visibility: hidden;

  backface-visibility: hidden;
   /* transform: translate(-50%, -50%); */
    /* transition: width .3s,height .3s; */
    /* transition: all .08s; */

`

const Info = styled.div`


`