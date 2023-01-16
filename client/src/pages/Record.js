import React,{useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoClose} from "react-icons/io5";


import {log, startRecording, stop} from '../util/recordUtil';

import Prompts from '../data/Prompts';


const maxCaptureTime = 5; //in minutes
// const recordingTimeMS = 1000 * 60 * maxCaptureTime; //specifies max length of the videos recorded in ms
const recordingTimeMS = 5000; //specifies max length of the videos recorded in ms


const Record = () => {

  // container refs
  const videoCaptureRef = useRef();
  const videoCapturWrapppereRef = useRef();

  const videoRecordingRef = useRef();
  const videoRecordingWappereRef = useRef();

  const downloadBtnRef = useRef();

  const promptRef = useRef();

  
  const [recordBtnText, setRecordBtnText] = useState('Record');
  const [videoComplete, setVideoComplete] = useState(false);


  useEffect(() => {
    console.log('set up')
    videoCapturWrapppereRef.current.classList.add("show");
    videoRecordingWappereRef.current.classList.add("hide");

    const video = videoCaptureRef.current;

    if (navigator.mediaDevices.getUserMedia && !videoComplete) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
           video.srcObject = stream;
        })
        .catch(function (err) {
          console.log("Something went wrong!");
        });
    }

    return () => {
      console.log('clean up');
      if( video?.srcObject !== null && !videoComplete){
        console.log('close recording');
        var stream =  video.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
          console.log('stop')
          var track = tracks[i];
          track.stop();
        }

        video.srcObject = null;
      }
    };
  },[]);
  

  const recordProccess = async () =>{
    const preview = videoCaptureRef.current;
    const downloadButton = downloadBtnRef.current;
    const recording = videoRecordingRef.current;

    console.log('ref gather')
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      console.log(`stream: ${stream}`);

      preview.srcObject = stream;
      downloadButton.href = stream;
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;

      await new Promise((resolve) => preview.onplaying = resolve);
      console.log(`preview playing`);

      const recordedChunks = await startRecording(preview.captureStream(), recordingTimeMS);


      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      recording.src = URL.createObjectURL(recordedBlob);
      downloadButton.href = recording.src;
      downloadButton.download = "RecordedVideo.webm";
      console.log(recording.src);


      log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
    
    } 
    catch (error) {
      if (error.name === "NotFoundError") {
        log("Camera or microphone not found. Can't record.");
      } else {
        log(error);
      };
    }
  }

  const toggleRecordCycle = () =>{
    if(recordBtnText === 'Record'){
      console.log('start record')

      recordProccess();
      setRecordBtnText('Stop');

    }else if(recordBtnText === 'Stop'){
      console.log('stop record')

      recordingFinished();
      setRecordBtnText('Record');
      videoRecordingWappereRef.current.classList.replace("hide","show");
      videoCapturWrapppereRef.current.classList.replace("show", "hide");
    }
  }

  const recordingFinished = ()=>{
    setVideoComplete(true);
    // stop(videoCaptureRef.current.srcObject);
    // videoCaptureRef.current.srcObject = null;
  }

  const handleFileUpload = ()=>{
    
  }

  const handleVideoPost = () =>{
    console.log('post video')
  }


  const generatePrompt = (e) => {
    e.preventDefault();

    // prompt parent element
    const promptWrap = promptRef.current.parentElement;

    // generates random prompt
    const newPrompt = [Prompts[Math.floor(Math.random()*Prompts.length)]];

    // creates clone prompt element
    const newPromptBubble =  promptRef.current.cloneNode(true);
    promptWrap.insertBefore(newPromptBubble, promptWrap.children[0]);
    newPromptBubble.firstChild.innerHTML = `<p>${newPrompt}</p>`;
    newPromptBubble.classList.add('slidein');
    newPromptBubble.key = 'prompt' + promptWrap.children.length;
    newPromptBubble.style.visibility = 'visible';

    // add close btn event listener
    newPromptBubble.querySelector("button").addEventListener('click', ()=>{closePrompt(newPromptBubble)})

    // removes oldest prompt once limit reached
    if(promptWrap.children.length > 4 ) {
      const removed = promptWrap.children[promptWrap.children.length-2];
      removed.lastChild.removeEventListener('click', closePrompt);
      removed.remove()
    }
  }

  const closePrompt = (promptBubble) => {
    // e.preventDefault();
    promptBubble.classList.replace('slidein', 'fadeout');
    setTimeout(() => {
      promptBubble.remove();
    }, 500);
    // 
    // console.log(e.target);

  }

  
  return (
    <>
      <Container>
      <Wrapper onSubmit={handleVideoPost}>

        {/*  video capture */}
        <VideoController ref={videoCapturWrapppereRef}>
          <VidCaptureWrap >
            <TitleInput style={{backdropFilter: 'blur(10px)'}} type={'text'} placeholder={'Preview Window'} disabled/>

               <VideoCapture ref={videoCaptureRef} autoPlay muted invert={true}/>

            <PromptWrap>
              <PromptHolder ref={promptRef}>
                <NewPrompt></NewPrompt>
                <CloseBtn><IoClose size={18}/></CloseBtn>
              </PromptHolder>
            </PromptWrap>
          </VidCaptureWrap>

        {/* recording btns */}
          <VideoBtnWrap>
            <Btn  onClick={generatePrompt}>Need a prompt?</Btn>
            {recordBtnText === 'Record' && <VidInput type="file" accept="video/mp4,video/x-m4v,video/*" capture="camera"/>}
            <Btn onClick={toggleRecordCycle} type='button'>{recordBtnText}</Btn>
          </VideoBtnWrap>
        </VideoController>

      {/* //////////////////////////////////////////////////////// /////////////////// */}

          {/* video recording  */}
          <VideoController ref={videoRecordingWappereRef}>
            <VidCaptureWrap>
            
            <TitleInput type={'text'} placeholder={'Name your vrnl entry'}/>
              <VideoCapture ref={videoRecordingRef} controls/>
            </VidCaptureWrap>

            {/* thumbnail and save btns */}
            <VideoBtnWrap>
            <Link to={'../..'} style={{textDecoration:'none', color:'inherit'}}><Btn>Cancel</Btn></Link>
            <Btn type='reset'>restart</Btn>
            <BtnLink
                href=''
                ref={downloadBtnRef}>
              Save to device
            </BtnLink>
            <Btn  type='submit'>post</Btn>
          </VideoBtnWrap>
        </VideoController>

        </Wrapper>
      </Container>
 
     </>
  )
}



export default Record



const Container = styled.section`
  flex: 2;
  height: 100%;
  width: 100%; 
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 1rem;
  overflow-y: auto;

   -webkit-mask-image: linear-gradient(transparent, black 10px, black 90% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 90% ,transparent);
  padding-top: 10px;

`

const Wrapper = styled.div`
  height: 100%;
  width: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  
`

const VideoController = styled.section`
  /* display: flex; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 800px;


`

const VidCaptureWrap = styled.div`
  /* max-height: 400px; */
  /* max-width: 800px; */
  width: 100%;
  height: min-content;
  display: grid;
  place-items: center;
  flex: 2;
  gap: 10px;
  position: relative;
`

const TitleInput = styled.input`
  width: 80%;
  padding: 10px;
  text-align: center;


  color:${({theme})=>theme.btnText};
  background: ${({theme})=>theme.inputBG};
   background: ${({theme})=>theme.elementBG};
	/* border: ${({theme})=>{ return `solid ${theme.icon} ${theme.borderThickness}}`}}; */
	border-color: ${({theme})=> theme.icon };
	border-width: ${({theme})=> theme.borderThickness };
	border-width: 0px;
  border-style: solid;

  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  -webkit-backdrop-filter: blur(10px);
  
  
  font-size:1rem;
   -webkit-appearance: none;


  &::placeholder{
    text-align: center;
    color:${({theme})=>theme.btnText};  
    
  }
`

const VideoCapture = styled.video`
  width: 100%;
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};
  object-fit: cover;
  object-position: center;
  opacity: .75;
  aspect-ratio:1.75;

  ${({invert})=>{
    if (invert){
      return `
        transform: rotateY(180deg);
        -webkit-transform:rotateY(180deg); /* Safari and Chrome */
        -moz-transform:rotateY(180deg); /* Firefox */
    `}
  }}
    
  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
    /* width: 80%; */
    
   aspect-ratio:1.25;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
   aspect-ratio: .75; 

  }
`

const VideoBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
`

const VidInput = styled.input`
  width: 114px;
  height: 3rem;

  background: ${({theme})=>theme.elementBG};
  border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
  padding: .25rem .75rem;
  color: ${({theme})=>theme.icon};
  font: inherit;
  outline: inherit; 
  backdrop-filter: ${({theme})=>theme.blur};
  cursor: pointer;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: 'Upload Video';
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    outline: none;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  &:hover::before {}
  &:active {}
  &:active::before {}

  &:hover{
     border: ${({theme})=>`solid ${theme.icon} 2px`};
  }
`

const Btn = styled.button`
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .25rem .75rem;
  color: ${({theme})=>theme.icon};
	font: inherit;
	outline: inherit; 
  backdrop-filter: ${({theme})=>theme.blur};
  height: 3rem;
  display: grid;
  place-content: center;

  &:hover{
    	cursor: pointer;
      border: ${({theme})=>`solid ${theme.icon} 2px`};
       /* background-color: rgba(255,255,255, .5) */
  }

`

const BtnLink = styled.a`
  background: ${({theme})=>theme.elementBG};
	border: ${({theme})=>`solid transparent 2px`};
  border-radius: ${({theme})=>theme.borderRadius};
	padding: .25rem .75rem;
  color: ${({theme})=>theme.icon};
	font: inherit;
	outline: inherit; 
  backdrop-filter: ${({theme})=>theme.blur};
  height: 3rem;
  display: grid;
  place-content: center;
  text-decoration: none;

  &:hover{
    	cursor: pointer;
      border: ${({theme})=>`solid ${theme.icon} 2px`};
       /* background-color: rgba(255,255,255, .5) */
  }

`

const PromptWrap = styled.span`
  position:absolute;
  bottom: 0rem;
  width: 100%;
  height: 4.5rem;
  overflow: hidden;

  -webkit-mask-image: linear-gradient(transparent, black 1.5rem, black 3.5rem ,transparent);
  mask-image: linear-gradient(transparent, black 1.5rem black 3.5rem ,transparent);

  /* background-color: red; */
  &::before,
  label::before {
    background-color: transparent;
        backdrop-filter: blur(100px);
        border-radius: ${({theme})=>theme.borderRadius};
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
`

const PromptHolder = styled.label`
  position: absolute;
  bottom: .5rem;
  left: 1rem;
  height: 2.5rem;
  width: calc(100% - 20px - 2rem);

  background-color: ${({theme})=>theme.promptBG};
  border-radius: ${({theme})=>theme.borderRadius};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  gap: .5rem;
  visibility: hidden;
  transform-origin: top center;

  transition: bottom .5s ease-in-out, 
              opacity .5s ease-in-out,
              scale .5s ease-in-out;

  &:nth-child(3){
    bottom: calc(.5rem + .5rem);
    opacity: .25;
    z-index: 3;
    scale: .95;
    pointer-events:none;
  }

  &:nth-child(2){
    bottom: calc(.5rem + .25rem);
    opacity: .35;
    z-index: 4;
    scale: .98;
    pointer-events:none;
  }

  &:nth-child(1){
    bottom: .5rem;
    opacity: 1;
    z-index: 5;
  }

  &:hover{
    button{
      visibility: visible;
    }
  }



`

const NewPrompt = styled.div`
  overflow: hidden;
  text-overflow: hidden;
  white-space: nowrap;
  width: 100%;
    	cursor: pointer;


  -webkit-mask-image: linear-gradient(to right, transparent, black 5px , black 95% ,transparent);
  mask-image: linear-gradient(to right, transparent, black 5px ,black 95% ,transparent);

  animation: grow 2.75s 1 linear; 
  @keyframes grow {
      from { width: 0%;}
      to { width: 100%;}
  }

  &:hover{
    p{
      animation: slide 10s .5s infinite linear;
    }
  }

  p{
    padding-left: 5px;
    position: relative;
    left: 0%;
    width: 100%;
    white-space: nowrap;
    transition: left 5s linear;
    /* font-weight: bold; */
  }


  @keyframes slide {
     0% {
        left: 0%;
    }
    50%{
      left: -100%;
      opacity: 1;
    }
    50.1%{
      opacity: 0;
    }
    50.2%{
      left: 100%; 
    }
    50.3%{
      left: 100%; 
      opacity: 1;
    }
    100%{
      left: 0%;
    }
  }

  @-webkit-keyframes slide {
    0% {
        left: 0%;
    }
    50%{
      left: -100%;
      opacity: 1;
    }
    50.1%{
      opacity: 0;
    }
    50.2%{
      left: 100%; 
    }
    50.3%{
      left: 100%; 
      opacity: 1;
    }
    100%{
      left: 0%;
    }
  }
`

const CloseBtn = styled.button`
  border-radius: 100%;
  height: 18px;
  width: 18px;
  border: transparent 2px solid;
  background: ${({theme})=>theme.elementBG};
  color: ${({theme})=>theme.icon};
  z-index:10;

  visibility: hidden;
  cursor: pointer;
  
  display: grid;
  place-items: center;

  &:hover{
     border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  }
`


const VidCapWrap = styled.span`


`