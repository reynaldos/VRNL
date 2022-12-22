import styled from "styled-components";


const Button = styled.button`
  font-size:1rem;
  color:${({theme})=>theme.btnText};  
  background: ${({theme})=>theme.button};
	/* border: ${({theme})=>`solid transparent  ${theme.borderThickness}`}; */
  border-color: transparent;
	border-width: 2px;
  border-style: solid;


  border-radius: ${({theme})=>theme.borderRadius};
  backdrop-filter: ${({theme})=>theme.blur};
  padding: 10px 20px;

  &:hover{
    cursor: pointer;
	   border-color: white;
  }

`
export default Button
