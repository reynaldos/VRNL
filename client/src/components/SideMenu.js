import React,{ useState, useMemo} from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from './Button';


import { 
  HiStar,
  HiOutlineStar, 
} from "react-icons/hi2";

import { IoAdd, IoSearch , IoClose} from "react-icons/io5";
import {MdOutlineCollectionsBookmark} from 'react-icons/md';


import { useDispatch } from "react-redux";
import { favorite, unfavorite, newCollection } from "../redux/userSlice";


export const SideMenu = ({type, collections,tabState }) => {

  const { currentUser } = useSelector(state=>state.user);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);


  const handleSearch = (e)=>{
    setSearch(e.target.value);
  }
  
  const favsSort = (a, b)=> {
    const aIsFave =  currentUser.favorites?.includes(a._id);
    const bIsFave =  currentUser.favorites?.includes(b._id);

    if (aIsFave === bIsFave) {
      return 0;
    }
    if (aIsFave) {
      return -1;
    }
    if (bIsFave) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }


  const toggleModal = (e) =>{
    e && e.preventDefault()
    setModalOpen(old => !old);
  }

  const sortedCollection = useMemo(()=> [...collections].filter(name => name.title.toLowerCase().includes(search.toLowerCase()))
                                                .sort(favsSort), [currentUser, search, collections]);

  
  const toggleMobileMenu = () => {
      setShowMobileMenu(oldVal => !oldVal);
  }

  return (
    <>

    <MobileTag onClick={toggleMobileMenu}
    showMobileMenu={showMobileMenu}>
      <MdOutlineCollectionsBookmark size={32}/>
    </MobileTag>


  <Container showMobileMenu={showMobileMenu}>
    <Wrapper>
      <TitleWrap>
        <Title>{type === 'myvournals'? 'My Vournals':'Subscribers'}</Title>
      </TitleWrap>
     
        <TabsWrap>
           <Tab onClick={toggleModal}>
             <TabIcon><IoAdd size={24} style={{color:``}}/></TabIcon>
            <TabText>Create Collection</TabText>
          </Tab>  
            {sortedCollection.map((value, index)=>{
                return <TabComp key={index} collectionData={value} tabState={tabState}/>
            })}

        </TabsWrap>

        <SearchWrap>
          <SearchIcon size={24}/>
           <SearchInput type={'text'} 
                        placeholder={'search collections'} 
                        onChange={handleSearch}
                        value={search}
                        />
           {search.length > 0 && <ClearBtn onClick={()=>{setSearch('')}}>x</ClearBtn>}
        </SearchWrap>

      </Wrapper>
    </Container>

   {modalOpen && <NewCollectionModal type={type} toggleModal={toggleModal}/>}
    </>
  )
}

// individual tab
const TabComp = ({collectionData, tabState}) =>{

  const {selectedTab, updateTab} = tabState;

  const { currentUser } = useSelector(state=>state.user);

  const titleScanLimit = 15;

  const dispatch = useDispatch();
  


  const handleTabChange =(e)=>{
    e.stopPropagation(); 
    updateTab(collectionData);
  }


  const handleFavorite = async(e) =>{
    e.stopPropagation(); 

    // toggle favorite for view and DB
    if(currentUser.favorites?.includes(collectionData._id)){
        dispatch(unfavorite(collectionData._id));
        await axios.put(`/users/unfavorite/${collectionData._id}`);
    } else{
        dispatch(favorite(collectionData._id));
        await axios.put(`/users/favorite/${collectionData._id}`);
    }
  }

  return (
     <Tab  onClick={handleTabChange}
     isSelected={selectedTab._id === collectionData._id}>
        <TabIcon onClick={handleFavorite}>
         {currentUser.favorites?.includes(collectionData._id) ? 
            <HiStar size={24}/> :
            <HiOutlineStar size={24}/>} 
          </TabIcon>

      <TabTextHolder scan={collectionData.title.length > titleScanLimit}><h4>{collectionData.title}</h4></TabTextHolder>
    </Tab>
  )
}

// modal for collection creation
const NewCollectionModal = ({type, toggleModal}) => {

  const [title, setTitle] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const dispatch = useDispatch();


  const createNewCollection = async (e) =>{
    e.preventDefault();

    var collectionType
    if(type === 'myvournals'){
      collectionType = "subscriberedFolders";
    } else{
      if(subscribers.length > 1){
        collectionType = "subscriberedGroups";
      }else{
        collectionType = "subscriberedUsers";
      }

    }

    
    const res = collectionType && await axios.post("/collections",{title, type: collectionType});

    if( res.status === 200) {
      dispatch(newCollection({type: collectionType, collectionId: res.data._id}))
      toggleModal();
    }
    
  }
  
  return(
    <ModalBG>
      <ModalContainer>
        <ModalWrapper>
            <CloseBtn onClick={toggleModal}><IoClose size={16}/></CloseBtn>

           <h1 color='white'>New Collection</h1>
           <SearchInput type={'text'} 
                        placeholder={'New Collection Name'} 
                        onChange={(e)=>{setTitle(e.target.value)}}
                        style={{width: 'calc(100% - 20px)'}}/>

           {type !== 'myvournals' && 
           <SubscribersContainer>
              <label>Subscribers</label>
              <SubscribersWrap>

              </SubscribersWrap>
            </SubscribersContainer>}

          <Button 
              onClick={createNewCollection}
              style={{width:'33%', alignSelf: 'center'}}>Create</Button>
        </ModalWrapper>
      </ModalContainer>
    </ModalBG>

  )
}


const Container = styled.menu`
    position: fixed;
    height: 90%;
    max-height: 900px;
    min-width: 300px;
    max-width: 360px;
    width: 30%;
    color:white;

    align-self: center;

    display: grid;
    place-items: center;
    z-index: 20;
    /* outline: solid 1px red; */

    @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
       /* display: none; */
       transition: transform .5s ease;
       transform: ${({showMobileMenu})=> (showMobileMenu ? `translateX(0%)`: `translateX(-105%)`)}
    } 

    @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
       /* display: none; */
      max-width: none;
      width: 100vw;
      height: 100vh;
      
    } 
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;

    background: ${({theme})=>theme.elementBG};
	  border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
    border-left: none;
    border-top-right-radius: ${({theme})=>theme.borderRadius};
    border-bottom-right-radius: ${({theme})=>theme.borderRadius};
    margin: 1rem;
    overflow:hidden;

    backdrop-filter: ${({theme})=>theme.blur};
    -webkit-backdrop-filter: ${({theme})=>theme.blur};


    @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
      border-radius: 0%;
      border: none;

    } 
`

const TitleWrap = styled.div`

  height: 100px;
  border-bottom:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  display:flex;
  align-items:flex-end;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
      padding-top: 3rem;
    } 
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem;
`

const TabsWrap = styled.ul`
    list-style: none;
    outline: blue 1px solid;
    height: calc(100% - 100px - 2.1rem - .25rem - 32px);
    overflow-y: auto;
    -webkit-mask-image: linear-gradient(transparent, black 15px, black 90% ,transparent);
    mask-image: linear-gradient(transparent, black 15px, black 90% ,transparent);

    /* li:first-child{
      margin-top: 5px;
    } */

    li:last-child{
      margin-bottom: 10%;
    }
  

     /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({theme})=>theme.elementBG};
    opacity: .15;
    transform: translateX(5px);
    background-color:transparent;
    position: absolute;
    
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

const Tab = styled.li`
  border-bottom: ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  padding: .5rem 0;
  display:flex;
  align-items: center;
  width: 100%;
  background-color: ${({isSelected})=>(isSelected ? ' rgba(255,255,255, .25)': 'inherit')};

  &:hover{
    cursor: pointer;
    background-color: rgba(255,255,255, .35);
  }

`

const TabIcon = styled.div`
  height: 32px;
  margin-left: 1rem;
  margin-right: .5rem;
  display: grid;
  place-content: center;
  z-index: 10;

  &:hover{
    cursor: pointer;
  }

`

const TabText = styled.h4`
  font-size: 1.5rem;
  line-height: 1.85rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;

`

const TabTextHolder = styled.div`
  overflow: hidden;
  text-overflow: hidden;
  white-space: nowrap;
  width: 100%;

  cursor: pointer;

  -webkit-mask-image: linear-gradient(to right, transparent, black 5px , black 95% ,transparent);
  mask-image: linear-gradient(to right, transparent, black 5px ,black 95% ,transparent);

  &:hover{
    h4{
      animation: ${({scan})=>(scan ? 'slide 10s .5s infinite linear' : '')}
    }
  }

  h4{
    font-size: 1.5rem;
    line-height: 1.85rem;
    padding-left: 5px;
    position: relative;
    left: 0%;
    width: 100%;
    white-space: nowrap;
    transition: left 5s linear;
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
    51%{
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
    51%{
      left: 100%; 
      opacity: 1;
    }
    100%{
      left: 0%;
    }
  }
`

const SearchWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: calc(1.1rem + 32px);
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 1rem;


`

const SearchIcon = styled(IoSearch)`
  /* height: 100%; */
  margin-right: .5rem;
  
`

const SearchInput = styled.input`
  width: calc(100% - 2rem - 20px - .5rem - 32px);
  padding: 5px;
  text-align: left;
  padding-left: 15px;

  color:${({theme})=>theme.btnText};
  background: ${({theme})=>theme.inputBG};
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
    text-align: left;
    /* padding-left: 5px; */
    color:${({theme})=>theme.btnText};  
    
  }

 
`


const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .25);
  backdrop-filter: blur(20px);

  width: 100vw;
  height: 100vh;
  z-index: 26;
  display: grid;
  place-items: center;

`

const ModalContainer = styled.div`
  width: calc(430px - 1rem);
  /* height: 100px; */
  background: ${({theme})=>theme.modalBG};
  /* border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`}; */
  border-radius: ${({theme})=>theme.borderRadius};
  margin: 1rem;
  position:relative;

  /* backdrop-filter: blur(500px);
  -webkit-backdrop-filter:blur(500px); */

  box-shadow: ${({theme})=>theme.modalShadow};

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
       width: calc(100% - 1rem);
    } 

`

const ModalWrapper = styled.div`
  margin: 1.25rem;
  width: calc(100% - 2.5rem);
  height: 100%;
  display: flex;
  flex-direction: column;

  gap: 1rem;
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
  color: white;
  cursor: pointer;
  
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  
  
  :nth-child(1){
     color: ${({theme})=>theme.icon};
  }

  :hover{
     border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
  }
`

const SubscribersContainer = styled.div`
  width: 100%;
`

const SubscribersWrap = styled.div`
  width: 100%;
  height: 200px;


`

const ClearBtn = styled(IoClose)`
    border-radius: 100%;
    background-color: ${({theme})=> theme.icon };
    height: 1rem;
    line-height: .15rem;
    font-size: .75rem;
    width: 1rem;
    z-index: 20;
    position: absolute;
    display: grid;
    place-items: center;
    top: calc((1.1rem + 32px) / 2);
    translate: 0% -50%;
    left: calc(100% - 2rem - 20px - 1rem);
    cursor: pointer;

     background: ${({theme})=>theme.inputBG};
  backdrop-filter: ${({theme})=>theme.blur};

`


const MobileTag = styled.button`
    z-index: 25;
    height: 3.5rem;
    width: 5rem;
    position: fixed;
    left: 0;
    top: 1rem;

    background: ${({theme})=>theme.elementBG};
    color: ${({theme})=> theme.icon };
	  border:  ${({theme, showMobileMenu})=> showMobileMenu ? `solid ${theme.border} ${theme.borderThickness}` : `solid transparent ${theme.borderThickness}`};
    border-left: none;
    border-top-right-radius: ${({theme})=>theme.borderRadius};
    border-bottom-right-radius: ${({theme})=>theme.borderRadius};

    backdrop-filter: ${({theme})=>theme.blur};
    -webkit-backdrop-filter: ${({theme})=>theme.blur};

    cursor: pointer;

    &:hover{
	    border:  ${({theme})=>`solid ${theme.border} ${theme.borderThickness}`};
      border-left: none;
      filter:${({showMobileMenu})=>showMobileMenu ? `brightness(85%)` : `0`};
    }

    transition: transform .5s ease;
    transform: translateX(-105%);

 @media screen and (max-width: ${({theme}) => theme.breakpoint.md}){
       transform: translateX(0%);
    } 

`