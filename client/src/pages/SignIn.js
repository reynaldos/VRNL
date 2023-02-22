import React, {useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

import { Link,useLocation, useNavigate } from "react-router-dom";
import {auth , provider } from '../util/firebase';
import { signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '../components/Modal';
import Button from '../components/Button';
import ConditionsInfo from '../data/ConditionsInfo';

import { FaEye, FaEyeSlash} from 'react-icons/fa';

const SignIn = () => {
  const location = useLocation().pathname.split('/').pop();
  const modalRef = useRef();

  return (
    <>
      <Container>

        {/* SIGN IN VIEW */}
        {location === 'signin' && <SignInView modalRef={modalRef}/>}

        {/* SIGN UP VIEW */}
        {location === 'signup' && <SignUpView modalRef={modalRef}/> }

        {/* FORGOT PASSWORD VIEW */}
        {location === 'forgot' && <ForgotPasswordView modalRef={modalRef}/>}

      
      {/* BOTTOM LINKS */}
        <More>
          {ConditionsInfo.map((value, index)=>{
              return <Links key={index} onClick={()=>{modalRef.current.open(value)}}>
                {value.title}
              </Links>
          })}
        </More>
      </Container>

      <Modal ref={modalRef}/>
    </>
  )
}

export default SignIn

// SIGN IN
const SignInView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hidePassword, setHidePassword] = useState(true);

  const validate = async(values) => {
    const errors = {};

    if (values.usernameEmail?.length === 0 ) {
      errors.usernameEmail = 'Required';
    } 
  
    if (values.password?.length === 0 ) {
      errors.password = 'Required';
    }

    if(values.usernameEmail?.length !== 0 && values.password?.length !== 0){
      const signInError = await handleSignIn(values);
      console.log(signInError.response.data)

      if (signInError.response.data.message === 'User not found!') errors.usernameEmail = "User not found";
      else if(signInError.response.data.message === 'Wrong Credentials!') errors.password = "Incorrect password";
      else  errors.usernameEmail = "Wrong Credentials";
    }
  
    console.log(errors)
    return errors;
  };

  // form hook
    const formik = useFormik({
      initialValues: {
          usernameEmail:'',
          password:'',
      },
      validate,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: values => {
        console.log('submit');
        validate(values);
        // handleSignIn()
        //  alert(JSON.stringify(values, null, 2));
        // handleNewUser();
      },
    });


  const handleSignIn = async (values) =>{

      dispatch(loginStart());

      try {
        const res = await axios.post("/auth/signin", {usernameEmail: values.usernameEmail, password: values.password});
        dispatch(loginSuccess(res.data));
        navigate('/');
          
      } catch (error) {
        dispatch(loginFailure());
        return error
      }
  }

  const signInWithGoogle = async (e) => {
    e.preventDefault();
      dispatch(loginStart());
      signInWithPopup(auth, provider)
        .then(async (result)=>{
          const res = await axios.post("/auth/google",{
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
          });
        
          dispatch(loginSuccess(res.data));
          navigate('/');
        
      }).catch((err)=>{
        dispatch(loginFailure());
      });
  }


  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
      <SubTitle>Sign In</SubTitle>

      <InputHolder>
        {formik.errors.usernameEmail ? <ErrMsg>{formik.errors.usernameEmail}</ErrMsg> : null}
        <Input  type="text"
                placeholder='username or email' 
                id='usernameEmail' 
                {...formik.getFieldProps('usernameEmail')}/>
       </InputHolder>

      <InputHolder>
        {formik.errors.password ? <ErrMsg>{formik.errors.password}</ErrMsg> : null}
        <Input  type={hidePassword ? "password" : "text"} 
                placeholder='password'
                id='password' 
                {...formik.getFieldProps('password')}/>

        <ViewIconWrap onClick={()=>{setHidePassword(oldVal=>!oldVal)}}>
            {!hidePassword ? <FaEye size={24}/> : <FaEyeSlash size={24}/>}
          </ViewIconWrap>

      </InputHolder>

      <Button active={true} type='submit'>Sign In</Button>
      <SubTitle style={{lineHeight:'1.2rem'}}>or</SubTitle>
      <Button active={true} onClick={signInWithGoogle}>Sign In with Google</Button>


      <div style={{flex:'2'}}></div>

      <BtnHolder>
        <TextBtn to={"/signup"}>Sign Up</TextBtn>
        <TextBtn to={"/forgot"}>Forgot Password</TextBtn>      
      </BtnHolder>
    </Wrapper>
  )
}

// SIGN UP
const SignUpView = ({modalRef}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);

  const ValdationSchema = Yup.object({
        username: Yup.string()
          .min(6, 'Must be at least 6 characters')
          .max(20, 'Must be 20 characters or less')
          .required('Required')
          .test('Unique Username', 'Username is taken', // <- key, message
                function (value) {
                  if (6 <= value.length && value.length <= 20){
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

  // form hook
  const formik = useFormik({
     initialValues: {
        username:'',
        email: '',
        password:'',
        confirmPassword: ''
     },
      validationSchema: ValdationSchema,
      validateOnChange: false,
     onSubmit: values => {
      //  alert(JSON.stringify(values, null, 2));
       handleNewUser();
     },
   });


  // log user in
  const handleNewUser = async () =>{
    dispatch(loginStart());

    try {
      const newUserRes = await axios.post("/auth/signup", {name: formik.values.username, email: formik.values.email, password: formik.values.password});

      const logInres = await axios.post("/auth/signin", {name: formik.values.username, password: formik.values.password});
      dispatch(loginSuccess(logInres.data));
      navigate('/');
        
    } catch (error) {
      // console.log(error.response.data.message)
      dispatch(loginFailure());
    }
  }


  return (
   <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
      <SubTitle>Sign Up</SubTitle>

      <InputHolder>
        {formik.touched.username && formik.errors.username ? <ErrMsg>{formik.errors.username}</ErrMsg> : null}
        <Input  
                type="text"
                placeholder='username' 
                id='username' 
                {...formik.getFieldProps('username')}/>
      </InputHolder>

      <InputHolder>
        {formik.touched.email && formik.errors.email ? <ErrMsg>{formik.errors.email}</ErrMsg> : null}
        <Input  type="email"    
                placeholder='email'    
                id='email' 
                {...formik.getFieldProps('email')}/>
       </InputHolder>

      <InputHolder>
        {formik.touched.password && formik.errors.password ? <ErrMsg>{formik.errors.password}</ErrMsg> : null}
        <Input  type={hidePassword ? "password" : "text"} 
                placeholder='password' 
                id='password'
                {...formik.getFieldProps('password')}/>


        <ViewIconWrap onClick={()=>{setHidePassword(oldVal=>!oldVal)}}>
            {!hidePassword ? <FaEye size={24}/> : <FaEyeSlash size={24}/>}
          </ViewIconWrap>
      </InputHolder>

      <InputHolder>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <ErrMsg>{formik.errors.confirmPassword}</ErrMsg> : null}
        <Input  type="password" 
                placeholder='re-enter password' 
                name='confirmPassword' 
                {...formik.getFieldProps('confirmPassword')}/>
       </InputHolder>

      <Button active={true} type='submit'>Sign Up</Button>

      <div style={{flex:'2'}}></div>
      <BtnHolder>
          <TextBtn to={"/signin"}>sign in instead</TextBtn>
      </BtnHolder>
    
    </Wrapper>
  )
}

// FORGOT PASSWORD
const ForgotPasswordView = () => {

  const [submitted, setSubmitted] = useState(false);

  const ValdationSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required')
    });

  // form hook
  const formik = useFormik({
     initialValues: {
        email: '',
     },
      validationSchema: ValdationSchema,
      validateOnChange: false,
     onSubmit: values => {
       handleSubmit(values);
     },
   });

  const handleSubmit = async (values) => {

    // try {
    //   await sendPasswordResetEmail(auth, values.email);
    // } catch (error) {
    //   console.log(error.message)
    // }

    setSubmitted(true);
  }

  return (
     <Wrapper onSubmit={formik.handleSubmit}>
        <Title>Welcome to<br/><span style={{textTransform:'uppercase'}}>VRNL!</span></Title>
        <SubTitle>Forgot Password</SubTitle>

       {!submitted ? <>
        <InputHolder>
          {formik.touched.email && formik.errors.email ? <ErrMsg>{formik.errors.email}</ErrMsg> : null}
          <Input  type="email"    
                  placeholder='email'    
                  id='email' 
                  {...formik.getFieldProps('email')}/>
        </InputHolder>

        <Button active={true} type='submit'>Send</Button>

        <div style={{flex:'2'}}></div>
        </>: 
        <Recovery>
       Account recovery email sent to: <br/><strong>{formik.values.email}</strong>
        </Recovery>
        }

        <BtnHolder>   
          <TextBtn to={"/signin"}>sign in instead</TextBtn>
        </BtnHolder>
      
      </Wrapper>
  )
}



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

const SubTitle = styled.h1`
  font-weight: 300;
  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    font-size: 1.75rem;
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
  position: relative;

`

const ViewIconWrap = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: grid;
  place-content: center;

  svg{
    cursor: pointer;
    filter: brightness(95%);
    -webkit-filter: brightness(95%);
  }
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

  /* &:focus{
    border:inherit;
  } */

`

const TextBtn = styled(Link)`
  color:${({theme})=>theme.btnText};
  text-decoration: none;
  padding: 5px 10px;

  &:hover{
    background: ${({theme})=>theme.hoverBG};
    border-radius: ${({theme})=>theme.borderRadius};
    backdrop-filter: ${({theme})=>theme.blur};

  }

`


const BtnHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const More = styled.div`
  margin-top: .25rem;
  width: 320px;
  display: flex;
  justify-content: center;
  gap: 2px;


  @media screen and (max-width: ${({theme}) => theme.breakpoint.xs}){
    width: 280px;
  }

`

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

const Recovery = styled.div`
  width: 100%;
  padding: 10px 20px;
  color:${({theme})=>theme.btnText};
  background-color: #A6D9B7E3;
	border-color: ${({theme})=> theme.icon };
	border-width: ${({theme})=> theme.borderThickness };
  border: 1px solid limegreen;
  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  /* gap: 10px; */
  font-size:1rem;
  text-align: center;


`


