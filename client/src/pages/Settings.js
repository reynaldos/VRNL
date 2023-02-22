import React, { useState, useRef } from 'react';
import styled from "styled-components";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from "axios";
import { useDispatch,useSelector } from "react-redux";

import Modal from '../components/Modal';
import Button from '../components/Button';
import ConditionsInfo from '../data/ConditionsInfo';

import { Link } from "react-router-dom";

import { uploadFile } from '../util/recordUtil';

import { loginSuccess } from "../redux/userSlice";



const Settings = () => {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state=>state.user);
  const [isEditting, setIsEditting] = useState(false);
  const [profileChanged, setProfileChanged] = useState(false);

  const modalRef = useRef();
  const profileRef = useRef();

  const ValdationSchema = Yup.object({
        username: Yup.string()
          .min(6, 'Must be at least 6 characters')
          .max(20, 'Must be 20 characters or less')
          .required('Required')
          .test('Unique Username', 'Username is taken', // <- key, message
                function (value) {
                  if (value === currentUser.name){
                    return new Promise((resolve, reject) => {
                      resolve(true);
                    })
                  }

                  if (value && 6 <= value.length && value.length <= 20){
                    return new Promise((resolve, reject) => {
                        axios.post("/auth/available", {name: value})
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.message === "Username taken!") {
                                    resolve(false);
                                }
                            })
                    })
                  }
                }
            ),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required')
          .test('Unique Email', 'Email is taken', // <- key, message
                function (value) {
                  if (value === currentUser.email){
                    return new Promise((resolve, reject) => {
                      resolve(true);
                    })
                  }
                   if (value && 6 <= value.length){
                    return new Promise((resolve, reject) => {
                        axios.post("/auth/available", {email: value})
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.message === "Email taken!") {
                                    resolve(false);
                                }
                            })
                      })  
                   }
                }
            ),
        password: Yup.string()
          .min(6, 'Must be at least 6 characters')
          .required('Required'),
        confirmPassword: Yup.string()
          .required('Required')
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          
      });

  const changeProfile = (event) =>{
    
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);

    setProfileChanged(true);
  }

  // form hook
  const formik = useFormik({
     initialValues: {
        username: currentUser.name,
        email: currentUser.email,
        password: isEditting ? '......' : '',
        confirmPassword: ''
     },
      validationSchema: isEditting ? ValdationSchema : null,
      validateOnChange: false,
     onSubmit: (v)=>{

        submitHandler(v)
     },
   });


   const btnHandler = () => {

    if (isEditting){
      setIsEditting(false);
    }else{
      formik.values.password = '';
      setIsEditting(true);
    }
    
   }

   const cancelHandler = (e) =>{

    setProfileChanged(false);

    e.preventDefault();
    setIsEditting(false);
    formik.values.username='resetted'

    formik.values.username = currentUser.name;
    formik.values.email = currentUser.email;
    formik.values.password = '......';
    formik.values.confirmPassword = '';
   }

   const submitHandler = async (values) => {

      var newUser;
      if (profileChanged) {
        const base64Response = await fetch(profileRef.current.src);
        const profileBlob =  await base64Response.blob();
        const imageURL = await uploadFile(currentUser._id, profileBlob, 'imgUrl');
        newUser = {name: values.username, email: values.email, password: values.password, image: imageURL};
      }else{
        newUser = {name: values.username, email: values.email, password: values.password};
      }

      const res = await axios.put(`/users/${currentUser._id}`, newUser);
      res.status === 200 && setIsEditting(false);
      dispatch(loginSuccess(res.data));
      setProfileChanged(false);

   }



  return (
    <>
   <Container>
       <Wrapper onSubmit={formik.handleSubmit}>
      <Title>settings</Title>
      <AvatarWrap isEditting={isEditting}>
         <label className="-label" htmlFor="file">
          <span>Change Image</span>
        </label>
        <input id="file" type="file" accept="image/*" onChange={changeProfile}/>
        <Avatar ref={profileRef} src={currentUser.image} id="output" width="200" loading='lazy'/>
      </AvatarWrap>
      


      <InputHolder>
        {isEditting && formik.touched.username && formik.errors.username ? <ErrMsg>{formik.errors.username}</ErrMsg> : null}
        <Input  
                disabled={!isEditting}
                type="text"
                placeholder='username' 
                id='username' 
                {...formik.getFieldProps('username')}
                />
      </InputHolder>

      <InputHolder>
        {isEditting && formik.touched.email && formik.errors.email ? <ErrMsg>{formik.errors.email}</ErrMsg> : null}
        <Input  
                disabled={!isEditting}
                type="email"    
                placeholder='email'    
                id='email' 
                {...formik.getFieldProps('email')}/>
       </InputHolder>

      <InputHolder>
        {isEditting && formik.touched.password && formik.errors.password ? <ErrMsg>{formik.errors.password}</ErrMsg> : null}
        <Input  
                disabled={!isEditting}
                type="password" 
                placeholder='password' 
                id='password'
                {...formik.getFieldProps('password')}/>
      </InputHolder>

      {isEditting && <InputHolder>
        {isEditting && formik.touched.confirmPassword && formik.errors.confirmPassword ? <ErrMsg>{formik.errors.confirmPassword}</ErrMsg> : null}
        <Input  type="password" 
                placeholder='re-enter password' 
                name='confirmPassword' 
                {...formik.getFieldProps('confirmPassword')}/>
       </InputHolder>}

      <Row>
        {isEditting && <Button 
                  inverse={true}
                 active={isEditting}
            onClick={cancelHandler}>Cancel</Button>}
        <Button active={true}
        onClick={btnHandler}>{isEditting ? 'Submit' : 'Edit'}</Button>
      </Row>


    </Wrapper>
      
      {/* BOTTOM LINKS */}
        <More>
          {ConditionsInfo.map((value, index)=>{
              return <Links key={index} onClick={()=>{modalRef.current.open(value)}}>
                {value.title}
              </Links>
          })}
        </More>
   </Container>

   <Modal ref={modalRef}/></>
  )
}

export default Settings


const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media screen and (min-height: 700px){
    justify-content: center;
  }
`

const Wrapper = styled.form`
  width: 280px;
  margin-top: 1.5rem;
 
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

  @media screen and (min-height: 700px){
     margin-top: none;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
     width: 240px;

  }

`

const Title = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 2.25rem;
    margin-bottom: .5rem;

  }
`

const ErrMsg = styled.div`
  align-self: flex-start;
  font-size: small;
`

const InputHolder = styled.span`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .25rem;

`

const Input = styled.input`
  width: 100%;
  padding: 10px 10px;
  color:${({theme})=>theme.btnText};
  text-transform: none;


  background: ${({theme})=>theme.inputBG};
	/* border: ${({theme})=>{ return `solid ${theme.icon} ${theme.borderThickness}}`}}; */
	border-color: ${({theme})=> theme.icon };
	border-width: ${({theme})=> theme.borderThickness };
	border-width: 0px;

  border-style: solid;

  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  
  font-size:1rem;
   -webkit-appearance: none;

  &::placeholder{
    color:${({theme})=>theme.btnText};  
  }


  &:disabled{
    filter: brightness(85%);
  }

  /* &:focus{
    border:inherit;
  } */

`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`


const BtnHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const AvatarWrap = styled.div`
    color: transparent;
    transition: all .3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all .3s ease;
    border-radius: 100%;


    input {
        display: none;
        border-radius: 100%;
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 165px;
        height: 165px;
        box-shadow: 0 0 10px 0 rgba(255,255,255,.35);
        z-index: 0;
        border-radius: 100%;
    }

    .-label {
       display: flex;
        justify-content: center;
        align-items: center;
   
        height: 165px;
        width: 165px;
        border-radius: 100%;
    }

    ${({isEditting})=>{
      return isEditting && `
      &:hover {
        .-label {
               cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, .8);
            z-index: 10000;
            color: rgb(250,250,250);
            transition: background-color .2s ease-in-out;
            border-radius: 100%;
            margin-bottom: 0;
        }
    }
      `
    }}
    

`

const Avatar = styled.img`
  /* width: 100px;
  aspect-ratio: 1;
  
  border-radius: 50%;
  object-fit: cover; */
`;

const Links = styled.button`
    background: none;
    color:${({theme})=>theme.btnText};
    border: none;
    padding: 5px 10px;


   &:hover{
    cursor: pointer;
    background: ${({theme})=>theme.hoverBG};
    border-radius: ${({theme})=>theme.borderRadius};
    backdrop-filter: ${({theme})=>theme.blur};
  }

    @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 12px;
  }

`

const More = styled.div`
  margin-top: .25rem;
  width: 320px;
  display: flex;
  justify-content: center;
  gap: 2px;
  z-index: 2;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    width: 280px;
  }

`