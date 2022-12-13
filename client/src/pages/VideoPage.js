import React from 'react';
import styled from "styled-components";
import { NewComment, CommentSection } from '../components/Comment.js';
import Thumbnail from '../imgs/thumbnail.png';


const VideoPage = () => {
  return (
    <Container>
      <Title>Video 1</Title>
      <SubTitle>reysanxez</SubTitle>
      <Wrapper>

        {/* VIDEO CONTAINER */}
        <VideoContainer>
            <VideoWrapper>
                <Video src={''} poster={Thumbnail} controls/>

                 {/* NEW COMMENT SECTION */}
                <NewCommentWrap>
                    <SubTitle>new Comment</SubTitle>
                    <NewComment/>
                </NewCommentWrap>

                <div style={{flex: '.75'}}></div>
              
            </VideoWrapper>
        </VideoContainer>

        {/* COMMENTS SECTION */}
        <VideoContainer>
            <VideoWrapper>
                <SubTitle style={{marginBottom:'0rem'}}>Comments</SubTitle>
                <CommentSection/>
            </VideoWrapper>
        </VideoContainer>

      </Wrapper>
    </Container>
  )
}

export default VideoPage



const Container = styled.div`

  flex: 2;
  width: calc(100% - 2rem); 
  max-width: ${({theme})=>theme.maxWidth};
  height:  calc(100% - 4rem);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
       width: calc(100% - .5rem); 
  } 

`
const Wrapper = styled.div`
  flex: 2;
  height: 100%;
  width: 100%; 
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-items: stretch;

  overflow-y: auto;
  gap: 1rem;  

  padding-top: 10px;

 -webkit-mask-image: linear-gradient(transparent, black 10px, black 70% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 70% ,transparent);

  @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}){
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-top: 10px;
  } 

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



const Title = styled.h2`
  align-self: flex-start;
  line-height: 1rem;
`

const SubTitle = styled.h3`
  align-self: flex-start;
  margin-bottom: 0rem;
`

const VideoContainer = styled.div`
  width: 100%;
  /* flex: 3; */
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};

 

`

const VideoWrapper = styled.div`
  height: calc(100% - 2rem);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
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
  flex: 2;
  width: 100%;
  height: 100%;
  margin-top: .5rem;
`



