import React,{useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";


import {log, startRecording, stop} from '../util/record';

const maxCaptureTime = 5; //in minutes
const recordingTimeMS = 1000 * 60 * maxCaptureTime; //specifies max length of the videos recorded in ms
// const recordingTimeMS = 5000; //specifies max length of the videos recorded in ms



const Record = () => {

  // container refs
  const videoCaptureRef = useRef();
  const videoCapturWrapppereRef = useRef();
  const videoRecordingRef = useRef();
  const videoRecordingWappereRef = useRef();
  const downloadBtnRef = useRef();

  
  const [recordBtnText, setRecordBtnText] = useState('Record');
  const [videoComplete, setVideoComplete] = useState(false);


  useEffect(() => {
      videoCapturWrapppereRef.current.classList.add("show");
      videoRecordingWappereRef.current.classList.add("hide");

      // console.log( videoRecordingRef.current.classList);

  },[]);
    // const video = videoCaptureRef.current;

    // if (navigator.mediaDevices.getUserMedia && !videoComplete) {
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then(function (stream) {
    //        video.srcObject = stream;
    //     })
    //     .catch(function (err0r) {
    //       console.log("Something went wrong!");
    //     });
    // }

  //   return () => {

  //     if( video && video.srcObject !== null && !videoComplete){
  //       console.log('close recording')
  //       var stream =  video.srcObject;
  //       var tracks = stream.getTracks();

  //       for (var i = 0; i < tracks.length; i++) {
  //         console.log('stop')
  //         var track = tracks[i];
  //         track.stop();
  //       }

  //       video.srcObject = null;
  //     }
  //   };
  // },[videoComplete]);
  

  const recordProccess = () =>{
    const preview = videoCaptureRef.current;
    const downloadButton = downloadBtnRef.current;
    const recording = videoRecordingRef.current;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      preview.srcObject = stream;
      // downloadButton.href = stream;
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;

      return new Promise((resolve) => preview.onplaying = resolve);

    }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
    .then ((recordedChunks) => {

      console.log(downloadButton)

      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      recording.src = URL.createObjectURL(recordedBlob);
      downloadButton.href = recording.src;
      downloadButton.download = "RecordedVideo.webm";

      log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
    })
    .catch((error) => {
      if (error.name === "NotFoundError") {
        log("Camera or microphone not found. Can't record.");
      } else {
        log(error);
      }
    });
  }


  const toggleRecordCycle = () =>{
    if(recordBtnText === 'Record'){
      // recordProccess();
      setRecordBtnText('Stop');


    }else if(recordBtnText === 'Stop'){

      // recordingFinished();
      setRecordBtnText('Record');
      videoRecordingWappereRef.current.classList.remove("hide");
      videoRecordingWappereRef.current.classList.add("show");

      videoCapturWrapppereRef.current.classList.remove("show");
      videoCapturWrapppereRef.current.classList.add("hide");

    }
  }

  const recordingFinished = ()=>{
    setVideoComplete(true);
    stop(videoCaptureRef.current.srcObject);
    videoCaptureRef.current.srcObject = null;
  }

  const handleFileUpload = ()=>{
    
  }

  const handleVideoPost = () =>{
    console.log('post video')
  }


  
  return (
    <Container>
     <Wrapper onSubmit={handleVideoPost}>

      <VideoController ref={videoCapturWrapppereRef}>
       {/*  video capture */}
      <VidCaptureWrap >

          <TitleInput style={{backdropFilter: 'blur(10px)'}} type={'text'} placeholder={'Preview Window'} disabled/>
          <VideoCapture ref={videoCaptureRef} autoPlay muted />
        </VidCaptureWrap>

       {/* recording btns */}
        <VideoBtnWrap>
          <Btn>Need a prompt?</Btn>
          {recordBtnText === 'Record' && <VidInput type="file" accept="image/*" capture="camera"/>}
          <Btn onClick={toggleRecordCycle} type='button'>{recordBtnText}</Btn>
        </VideoBtnWrap>
      </VideoController>

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
  display: grid;
  place-items: center;
  flex: 2;
  gap: 10px;
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
  opacity: .55;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}){
    /* width: 80%; */
    
   aspect-ratio: 1.25; 
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){

  }
`

const VideoBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
  /* background-color: yellow; */
  
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