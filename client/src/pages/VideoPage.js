import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import { NewComment, CommentSection } from '../components/Comment.js';
// import Thumbnail from '../imgs/thumbnail.png';

import axios from 'axios';
import format from '../util/timeRelative';

import { LoadingIcon} from '../components/LoadingIcon';

import { OptionsButton } from '../components/OptionsButton';

import {
 useLocation,
 useNavigate
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess, fetchFailure } from "../redux/videoSlice";
import { toggleUpload } from "../redux/userSlice";




const VideoPage = () => {
  const { currentVideo,loading } = useSelector(state=>state.video);

  const [ loadComments, setLoadComments] = useState(true);
  const [ comments, setComments ] = useState([]);

  const navigate = useNavigate();
  const videoId = useLocation().pathname.split('/').pop();
  const location =  useLocation().pathname.split('/')[1];

  const [editTitle, setEditTitle] = useState(false);
  const titleRef = useRef();

  const dispatch = useDispatch();

  const optionBtnActions = [
    {
      title: 'rename',
      icon: <></>,
      action: ()=>{
        // setEditTitle(oldVal => !oldVal)
      }
    },
    {
      title: 'delete',
      icon: <></>,
      action: ()=>{deleteVideo()}
    }
  ]

  const renameVideo = async() => {


  }

  const deleteVideo =  async() => {


    try {
      const res = await axios.delete(`/videos/${videoId}`);  
      dispatch(toggleUpload(true));
      navigate(`/${location}/collection/${currentVideo.collectionId}`);

    } catch (error) {
      dispatch(fetchFailure());
    }

  }


 useEffect(()=>{

     const videoData = async () =>{
      try {

        // if(videoId !== currentVideo._id){
          dispatch(fetchStart());
            const videoResult = await axios.get(`/videos/find/${videoId}`);  
            const userNameResult = await axios.get(`/users/find/${videoResult.data.userId}`);
            const foundComments = await axios.get(`/comments/${videoId}`);
            
          setComments(foundComments.data.reverse()); 
          dispatch(fetchSuccess({...videoResult.data, username: userNameResult.data.name}));
        // }
      } catch (error) {
        dispatch(fetchFailure());
      }
      setLoadComments(false);

    }
    videoData();
  },[]);


  const updateComments = async() =>{

    setLoadComments(true);
    try {
      const foundComments = await axios.get(`/comments/${videoId}`);
      setComments(foundComments.data.reverse()); 

    } catch (error) {
      console.log(error)
    }
    setLoadComments(false);

  }

  return (
    <>
      <Container>
          <Row>
            {!editTitle ? 
                <Title>{currentVideo.title}</Title> :
                <TitleInput 
                ref={titleRef}type={'text'} 
                value={currentVideo.title} 
                disabled={!editTitle}/>
                }
              <OptionsButton btnList={optionBtnActions}/>
            </Row>

          <SubTitle>{currentVideo.username}</SubTitle>
          {currentVideo && <SubTitle style={{color:'rgba(217, 217, 217,1)'}}>{format(currentVideo.createdAt)}</SubTitle>}
        <Wrapper>

          {/* VIDEO CONTAINER */}
          <VideoContainer>
              {loading ? 
              <VideoWrapper><LoadingIcon/></VideoWrapper> :

                <VideoWrapper>
                    <Video src={currentVideo.videoUrl} poster={currentVideo.imgUrl} controls/>

                    {/* NEW COMMENT SECTION */}
                    <NewCommentWrap>
                        <SubTitle>new Comment</SubTitle>
                        <NewComment videoId={currentVideo._id} updateComments={updateComments}/>
                    </NewCommentWrap>

                    <div style={{flex: '.75'}}></div>
                  
                </VideoWrapper>}
          </VideoContainer>

          {/* COMMENTS SECTION */}
          <VideoContainer>
              {loadComments ? 
              <VideoWrapper><LoadingIcon/></VideoWrapper> :
              
              <VideoWrapper>
                  <SubTitle style={{marginBottom:'0rem'}}>Comments</SubTitle>
                  <CommentSection comments={comments} updateComments={updateComments}/>
              </VideoWrapper>}
          </VideoContainer>

        </Wrapper>
      </Container> 
    </>
   
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



const TitleInput = styled.input`
  /* all: unset; */
  font-weight: 700;
  font-size: 1.5rem;
  /* background-color: blue; */
  /* width: min-content; */

`

const Title = styled.h1`
  /* all: unset; */
  font-weight: 700;
  font-size: 1.5rem;
  /* background-color: blue; */
  /* width: min-content; */


`

const SubTitle = styled.h4`
  align-self: flex-start;
  margin-bottom: 0rem;
  font-weight: 100;
  color:white;
  line-height: 1.2rem;

`

const VideoContainer = styled.div`
  width: 100%;
  /* flex: 3; */
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};

   &::before
  {
    content: "";
    display: block;
    width: 100%;
    background-color: transparent;
    backdrop-filter: ${({theme})=>theme.blur};
    -webkit-backdrop-filter: ${({theme})=>theme.blur};
    border-radius: ${({theme})=>theme.borderRadius};
    position:absolute;
    /* outline: 2px red solid; */
  }

`

const VideoWrapper = styled.div`
  height: calc(100% - 2rem);
  min-height: 150px;
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
  opacity: .85;
  max-height: 600px;

  /* [poster]{
  opacity: .55;

  } */


`

const NewCommentWrap = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  margin-top: .5rem;
`



const Row = styled.span`
 align-self: flex-start;

  display: flex;
  gap: 10px;
  align-items: center;
  align-content: center;
`