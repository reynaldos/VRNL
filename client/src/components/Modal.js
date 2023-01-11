import styled from "styled-components";
import React, { useState, forwardRef, useImperativeHandle,useRef} from 'react';
import { IoClose} from "react-icons/io5";


const Modal = forwardRef((props, publicRef) => {

    const [modalData, setModalData] = useState();
    const modalRef = useRef();

    const openModal = (data) => {
         setModalData(data);
        modalRef.current.showModal();
    }

    const hideModal = () => {
         modalRef.current.close();
            setModalData({
                title:'',
                info:[]
            });
       
    }

    useImperativeHandle(publicRef, ()=>{
        return {
            open(data){
                openModal(data);
            },
            close(){
                hideModal();
            }
        }
    })

  return (
    <Container ref={modalRef} role="dialog" aria-modal="true">
        <Wrapper>
            <Title>{modalData?.title}</Title>
            {modalData?.info.map((value, index)=>{
                return <Info key={index}>{value}</Info>
            })}
            <CloseBtn onClick={hideModal}><IoClose/></CloseBtn>
        </Wrapper>
    </Container>
  )
});

export default Modal


const Container = styled.dialog`

    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    min-width: 100vw;

    margin: auto; 
    background-color: transparent; 
    border: none;
    backdrop-filter: blur(100px);
    overflow: hidden;
    /* animation: fadein .5s 1 ease-in-out;

    @keyframes fadein {
    from {backdrop-filter: blur(0px);}
    to {backdrop-filter: blur(100px);}
    } */
`

const Wrapper = styled.div`
    position: relative;
    top: 50%;
    translate: 0 -50%;
    width: 280px;
    margin: auto;

    background: ${({theme})=>theme.elementBG};
    /* border: ${({theme})=>`solid ${theme.icon} ${theme.borderThickness}`}; */
    border: ${({theme})=>`solid ${theme.icon} 0px`};

    border-radius: ${({theme})=>theme.borderRadius};
    backdrop-filter: ${({theme})=>theme.blur};

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 15px;
    padding: 2rem 3rem;

    /* animation: slidein .7s 1 ease-in-out;

    @keyframes slidein {
    from {top: 250%; scale: 0;}
    to {top: 50%; scale: 1;}
    } */

    @media screen and (min-height: 700px){
        margin-top: none;
    }

    @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
        width: 240px;

    }

`

const Title = styled.h1`
    color: ${({theme})=>theme.text};


`

const Info = styled.p`
    width: 100%;
    color: white;

` 

const CloseBtn = styled.button`
  position: absolute;
  margin: 1rem;
  right: 0;
  top: 0;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  border: transparent 2px solid;
  background: ${({theme})=>theme.elementBG};
  color: ${({theme})=>theme.icon};

  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
     border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  }
`