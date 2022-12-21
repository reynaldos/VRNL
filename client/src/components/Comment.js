import React, {useRef, useEffect, useState} from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';
import {format} from 'timeago.js';



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
  
  return (
    <Container>
      <Details>
      <Avatar src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />

        <Name>
          John Doe<br/><Date>1 day ago</Date>
        </Name>
         </Details>
        <Text>
            {data}
        </Text>
     
    </Container>
  );
} ;


export const NewComment = () =>{

  const { currentUser } = useSelector(state=>state.user);
  

  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState('');


   return <NewCommentContainer>
      <Details>
        <Avatar src={currentUser.image} />
         <Name style={{padding:'12px 0px'}}>{currentUser.name}</Name>

          <div style={{flex:'2',width:'100%'}}></div>

         <BtnHolder active={isActive}>
             <Button  inverse={true}>Cancel</Button>
         <Button active={comment.trim().length > 0}>Comment</Button>
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

 /* -webkit-mask-image: linear-gradient(transparent, black 10px, black 70% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 70% ,transparent); */


  -webkit-mask-image: linear-gradient(transparent, black 10px, black 95% ,transparent);
  mask-image: linear-gradient(transparent, black 10px, black 95% ,transparent);

  padding-top: 10px;

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
  display: ${({active})=>(active ? 'block' : 'none')};
`

const Button = styled.button`
  /* font-size:1rem; */
  color:${({theme})=>theme.btnText};  
  background: ${({theme, inverse,active})=> !inverse && active ? theme.button : 'transparent'};
	/* border: ${({theme})=>`solid transparent  ${theme.borderThickness}`}; */
  border-color: transparent;
	border-width: 2px;
  border-style: solid;
  margin-left: 10px;


  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  padding: 5px 10px;


  &:hover{
    cursor: pointer;
	   border-color: white;
  }

  &:first{
     backdrop-filter: none;
  }

`