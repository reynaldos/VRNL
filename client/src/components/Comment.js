import React, {useRef, useEffect, useState} from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';
import {format} from 'timeago.js';

import axios from 'axios';


export const CommentSection = ({comments}) =>{
  return(
      <CommentsContainer style={{maxHeight:'100%',height:'100%'}}>
        {comments.map((value, index)=>{
          return <Comment key={index} data={value}/>
        })}

        {comments.length === 0 && 
         <Container>
        <Text>No Comments </Text>
     
    </Container>}
      </CommentsContainer>
  )

}

const Comment = ({data}) => {

  const [user, setUser] = useState({});

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const res = await axios.get(`/users/find/${data.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser();

  },[])
  
  return (
    <Container>
      <Details>
      <Avatar src={user.image} />

        <Name>
           {user.name}<br/><Date>{format(data.createdAt)}</Date>
        </Name>
         </Details>
        <Text>
            {data.desc}
        </Text>
     
    </Container>
  );
} ;


export const NewComment = ({videoId, updateComments}) =>{

  const { currentUser } = useSelector(state=>state.user);
  

  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState('');

  const cancelComment = () =>{
    inputRef.current.value = '';
    setComment('');
  }

  const postComment = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post("/comments", {videoId, desc: comment});
      cancelComment();
      updateComments();
      // dispatch(loginSuccess(res.data));
        
    } catch (error) {
      // dispatch(loginFailure());

    }
  }

   return <NewCommentContainer>
      <Details>
        <Avatar src={currentUser.image} />
         <Name style={{padding:'12px 0px'}}>{currentUser.name}</Name>

          {/* <div style={{flex:'2',width:'100%'}}></div> */}

         <BtnHolder active={isActive || comment.trim().length > 0}>
             <Button inverse={true} onClick={cancelComment}>Cancel</Button>
              <Button 
                  active={comment.trim().length > 0}
                  onClick={postComment}
                >Comment</Button>
         </BtnHolder>
        
        
         </Details>
        <Input ref={inputRef} 
                placeholder="Add a comment..." 
                type={'text'}
                onChange={e=>setComment(e.target.value)}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}/>
    </NewCommentContainer>
}

const CommentsContainer = styled.div`
  flex: 1;
  margin-top: .5rem; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  width: 100%;
  padding-bottom: 100px;

  -webkit-mask-image: linear-gradient(transparent, black 10px, black 95% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 95% ,transparent);

  padding-top: 10px;

   div:last-child{
      margin-bottom: 5%;
    }

    /* width */
  ::-webkit-scrollbar {
    width: 10px;
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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
  gap: 10px;
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};
  padding: 1rem;
  margin: 0 .5rem;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;  
  color: ${({ theme }) => theme.text};
`
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: white;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
    opacity: .75;
`

const Text = styled.span`
  font-size: 14px;
`



const NewCommentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  background: ${({theme})=>theme.elementBG};
  border-radius: ${({theme})=>theme.borderRadius};
  padding: 1rem;
  height: calc(100% - 40px - 2rem);
  margin: 0 .5rem;
  margin-top: .5rem;

  width: calc(100% - 1rem - 2rem);

  -webkit-appearance: none;
`;

const Input = styled.textarea`
  flex: 1;
  height: calc(100% - 1rem);
  width: calc(100% - 1rem);
  padding: 10px;
  color:${({theme})=>theme.btnText};

  background: ${({theme})=>theme.inputBG};
  backdrop-filter: ${({theme})=>theme.blur};

	border-color: ${({theme})=> theme.icon };
	border-width: ${({theme})=> theme.borderThickness };
	border-width: 0px;
  border-style: solid;
  border-radius: ${({theme})=>theme.borderRadius};
  
  font-size:1rem;
  resize: none;
   -webkit-appearance: none;

  &::placeholder{
    color:${({theme})=>theme.btnText};  
    resize: none; 
  }
`;

const BtnHolder = styled.div`
  display: ${({active})=>(active ? 'flex' : 'none')};
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
  
`

const Button = styled.button`
  /* font-size:1rem; */
  color:${({theme})=>theme.btnText};  
  background: ${({theme, inverse,active})=> !inverse && active ? theme.button : 'transparent'};
	/* border: ${({theme})=>`solid transparent  ${theme.borderThickness}`}; */
  border-color: transparent;
	border-width: 2px;
  border-style: solid;


  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  padding: 5px 10px;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}){
   padding: 4px 4px;
   font-size: small;

  }


  &:hover{
    cursor: ${({inverse,active})=> inverse || active ? 'pointer' : ''};
	  border-color: ${({inverse,active})=> inverse || active ? 'white' : ''};
  }

  /* &:nth-child(2){
     background-color:red;
  } */

`