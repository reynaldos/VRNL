import React, {useState,useEffect} from 'react';
import styled from "styled-components";
import { SideMenu } from '../components/SideMenu';
import { ViewVideos } from '../components/ViewCollection';
import { MainDisplay } from '../components/MainDisplay';
import { OptionsButton } from '../components/OptionsButton';

import Record from './Record';
import VideoPage from './VideoPage';

import { HiOutlineVideoCamera} from "react-icons/hi2";

import axios from 'axios';

import { deleteCollection as reduxDeleteCollection} from "../redux/userSlice";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
  Route,
  Routes,useLocation
} from "react-router-dom";

const Dashboard = ({type}) => {

  const navigate = useNavigate(); 
  const isRecordPage = useLocation().pathname.split('/').includes('record');
  const isVideoPage = useLocation().pathname.split('/').includes('video');

  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();


  const [ collections, setCollections ] = useState([]);

  const [selectedTab, setSelected] = useState('');


  const optionBtnActions = [
    {
      title: 'rename',
      icon: <></>,
      action: ()=>{}
    },
    {
      title: 'combine',
      icon: <></>,
      action: ()=>{}
    },{
      title: 'delete',
      icon: <></>,
      action: ()=>{deleteCollection()}
    }
  ]


  // updates view when location changes
  useEffect(()=>{
    fetchCollections();
  },[type, currentUser.subscriberedFolders, currentUser.subscriberedUsers, currentUser.subscriberedGroups])

  // returns array of ids depending on location
  const getcollectionIds = () =>{
    
    if (type === 'myvournals'){
      const ids = currentUser.subscriberedFolders;
      return ids;
    }else{

      const ids = currentUser.subscriberedUsers.concat(currentUser.subscriberedGroups);
      return ids;
    }
  }

  // changes selected tab in side menu and main display
  const updateTab = (collectionData) =>{

    if (collectionData._id === selectedTab._id){
      setSelected('');
    } else{
      setSelected(collectionData);
    }
    
    navigate(`/${type}`);
  }

  // fetch new collections
  const fetchCollections = async () =>{
      try {

        const collectionIds = getcollectionIds();
        const CollectionRes = await Promise.all(collectionIds.map(async (id) =>{

          return await (await axios.get(`/collections/${id}`)).data
        }));

        setCollections(CollectionRes); 

        // update main display when tab changes
        setSelected(CollectionRes.length > 0 ? CollectionRes[0] : '');  
        
      } catch (error) {
        
      }
    }

  // Delete collection
   const deleteCollection =  async() => {
      try {
        await axios.delete(`/collections/${selectedTab._id}`);  
        dispatch(reduxDeleteCollection({type: type === 'myvournals' ? 'subscriberedFolders' : '', collectionId: selectedTab._id}))
        setSelected('');
        fetchCollections();

      } catch (error) {
      }
  }
  
  return (
    <Container>
      
     
     {/* side menu */}
     {!isRecordPage &&
      <SideMenu type={type} 
                collections={collections} 
                tabState={{selectedTab, updateTab}}/> }

      {!isRecordPage &&<SideSpacer />}

      {selectedTab !== '' ? <Main>

        {!isVideoPage && !isRecordPage &&
        // defaut title
        <TitleWrap>
          <Title>{selectedTab.title}</Title>
          <OptionsButton btnList={optionBtnActions}/>
        </TitleWrap>}

        {/* // record title */}
        {isRecordPage && <TitleWrap>
          <HiOutlineVideoCamera size={48} style={{paddingTop:'.5rem'}}/>
          <Title>{selectedTab.title}</Title>
        </TitleWrap>}
        

        <Routes>
          <Route path="/">
            <Route index element={<MainDisplay selectedTab={selectedTab}/>}/>

            <Route path="collection">
              <Route path=":collectionId" element={<ViewVideos/>}/>                
            </Route>

             <Route path="video">
                <Route path=":videoId" element={<VideoPage/>}/>
              </Route>  

             <Route path="record">
                <Route path=":collectionId" element={<Record/>}/>
             </Route>
          </Route>
        </Routes>

      </Main> :  <Main style={{justifyContent: 'center'}}><Title empty={true}>Select a collection or create a new one and start recording!</Title></Main> }
    </Container>
 
  )
}

export default Dashboard


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;

` 

const Main = styled.main`
  flex: 3.5;
  height: calc(100% - 5rem - 2.5rem);
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  position: relative;

`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 430px;

  /* outline: 1px solid black; */
  margin-top: 1rem;

`

const Title = styled.h1`
  margin: auto .5rem;
  line-height: 2rem;
  text-align: center;
  
  ${({empty,theme})=>{
    if(empty){
      return `
      position:relative;
      top: -40px;
      width: 80%;
      text-align: center;
      background: ${theme.elementBG};
      border: solid  ${theme.border} 2px;
      border-radius: ${theme.borderRadius};
      padding: .75rem;
      color:white;
      `
    }
  }}
`


const SideSpacer = styled.div`
/* flex: 1; */
width: 30%;
min-width: 300px;
max-width: 360px;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
       display: none;
    } 

`


