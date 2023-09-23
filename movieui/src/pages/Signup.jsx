import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BackGroundImage from '../components/BackgroundImage';
import {firebaseAuth} from '../utils/firebase-config.js'
import Header from '../components/Header.jsx';

function Signup() {
  const navigate=useNavigate('');
  const [showPassword,setShowPassword]=useState(false);
  let [formDetails,setFormDetails]=useState({
    email:"",
    password:""
  });
  const handleSignIn=async ()=>{
    try{
      const {email,password}=formDetails;
      await createUserWithEmailAndPassword(firebaseAuth,email,password);
    }catch(error){
      console.log(error.message);
    }
  }
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser){
      navigate("/");
    }
  });
  return (

    <div>
      <Container showPassword={showPassword}>
      <BackGroundImage/>
      <div className="content">
      <Header login/>
      <div className="body flex column a-center j-center">
        <div className="text flex column">
          <h1>Unlimited movies, TV shows and more</h1>
          <h4>Watch anywhere. Cancel anytime</h4>
          <h6>Ready to watch? Enter your email to create or restart membership</h6>
        </div>
        <div className="form">
            <input type="email" placeholder="Email Address" name="email" value={formDetails.email} onChange={(e)=>{setFormDetails({...formDetails,[e.target.name]:e.target.value})}}>
            </input>
            {
              showPassword &&             (<input type="password" placeholder="Password" name="password" value={formDetails.password} onChange={(e)=>{setFormDetails({...formDetails,[e.target.name]:e.target.value})}}>
              </input>)
            }{
              !showPassword && (
                <button onClick={()=>setShowPassword(true)}>GetStarted</button> 
              )
            }
  
        </div>
        <button onClick={handleSignIn}>Sign Up</button>
      </div>
      </div>
      
      </Container>
    </div>
  )
}
const Container=styled.div`
position:relative;
.content{
  position:absolute;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.5);
  height:100vh;
  width:100vw;
  display:grid;
  grid-template-rows:15vh 85vh;
  }
  .body{
    gap:1rem;
    .text{
      gap:1rem;
      text-align:center;
    font-size:2rem;
    h1{
      padding:0 25rem;

    }
    }
    .form{
      display:grid;
      width:60%;
      grid-template-columns:${({showPassword})=>showPassword?"1fr 1fr":"2fr 1fr"};
      input{
        color:black;
        border:none;
        padding:1.5rem;
        font-size:1.2rem;
        border:1px solid black;
        &:focus{
          outline:none;

        }
      }
      button{
        padding:0.5rem 1rem;
        background-color: #e50914;
        border:none;
        cursor:pointer;
        color:white;
        
        font-weight:bolder;
        font-size:1.05rem;

      }
    }
    button{
      padding:0.5rem 1rem;
      background-color:#e50914;
      border:none;
      cursor:pointer;
      color:white;
      
      border-radius:0.2rem;
      font-weight:bolder;
      font-size:1.05rem;
    }
  }
}`;
export default Signup
