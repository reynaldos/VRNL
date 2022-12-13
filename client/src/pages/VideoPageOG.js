import React from 'react';
import styled from "styled-components";
import { NewComment, CommentSection } from '../components/Comment.js';
import Thumbnail from '../imgs/thumbnail.png';


const VideoPage = () => {
  return (
    <Container>
         {/* VIDEO SECTION */}
        <Wrapper>
          {/* <div style={{position:'relative'}}> */}
            <Title>My Video</Title>
            <SubTitle>reysanxez</SubTitle>
            {/* </div> */}


            {/* VIDEO BOX */}
            <VideoContainer>
              <VideoWrapper>
                <Video src={''} poster={Thumbnail} controls/>

                 {/* NEW COMMENT SECTION */}
                <NewCommentWrap>
                    <SubTitle style={{margin:'0'}}>new Comment</SubTitle>
                    <NewComment/>
                </NewCommentWrap>
                <div style={{height:'100px'}}> </div>

              </VideoWrapper>
            </VideoContainer>
          
        </Wrapper>


        {/* COMMENTS SECTION */}
        <VideoContainer style={{flex:'1', marginTop: '3.75rem'}}>
         <VideoWrapper >
            <SubTitle style={{margin:'0'}}>Comments</SubTitle>
                <CommentSection/>
            </VideoWrapper>
            </VideoContainer>
        
    </Container>
  )
}

export default VideoPage


const Container = styled.section`
  flex: 2;
  height: 100%;
  /* width: 100%;  */
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* margin: 0 1rem; */
  overflow-y: auto;
  gap: 1rem;  
  /* outline: 1px solid red; */
  align-items: stretch;



 -webkit-mask-image: linear-gradient(transparent, black 5%, black 70% ,transparent);
  mask-image: linear-gradient(transparent, black 5%, black 70% ,transparent);

  @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}){
    flex-direction: column;
    padding-top: 100%;
  } 

 /* width */
   /* width */
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({theme})=>theme.elementBG};
    opacity: .25;
    transform: translateX(5px);

  }

  /* Track */
  ::-webkit-scrollbar-track:hover {
    opacity: 1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({theme})=>theme.button};
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }

`

const Wrapper = styled.div`
  flex: 2;
  height: 100%;
  width: calc(100% - 2rem); 
  min-width: 430px;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  /* outline: 1px solid blue; */

   

   /* @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    width: calc(100% - 2rem); 
    min-width: auto;
  } */

`

const Title = styled.h2`
  align-self: flex-start;
  line-height: 1rem;
`

const SubTitle = styled.h3`
  align-self: flex-start;
  margin: .5rem 0;


`

const VideoContainer = styled.div`
  width: 100%;
  flex: 3;
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  /* outline: 1px solid green; */

`

const VideoWrapper = styled.div`
  height: calc(100% - 2rem);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  

  /* outline: 1px solid yellow; */


  /* @media screen and (min-width: ${({theme}) => theme.breakpoint.md}){
    flex-direction: row;
  } */
`

const Video = styled.video`
  flex: 4;
  width: 100%;
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};
  aspect-ratio: 2;
  object-fit: cover;
  object-position: center;
  opacity: .55;
  max-height: 600px;
`

const NewCommentWrap = styled.div`
  width: 100%;
  margin-top: .5rem;
`



