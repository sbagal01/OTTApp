import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BackGroundImage from '../components/BackgroundImage';
import {firebaseAuth} from '../utils/firebase-config.js'
import Header from '../components/Header.jsx';

function Login() {
  const navigate=useNavigate('');
  const [showPassword,setShowPassword]=useState(false);
  let [formDetails,setFormDetails]=useState({
    email:"",
    password:""
  });
  const handleLogIn=async ()=>{
    try{
      const {email,password}=formDetails;
      await signInWithEmailAndPassword(firebaseAuth,email,password);
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
      <Container>
        <BackGroundImage />
        <div className="content">
          <Header />
        <div className="form-container flex column a-center j-center">
        <div className="form a-center j-center flex column">
          <div className="title">
          <h1>Login</h1>
          </div>
          <div className="container flex column">
          <input type="email" placeholder="Email Address" name="email" value={formDetails.email} onChange={(e)=>{setFormDetails({...formDetails,[e.target.name]:e.target.value})}}>
            </input>
            
            <input type="password" placeholder="Password" name="password" value={formDetails.password} onChange={(e)=>{setFormDetails({...formDetails,[e.target.name]:e.target.value})}}>
            </input>
            <button onClick={handleLogIn}>Log In</button>
        </div>
        
          </div>
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
  grid-template-rows:15vh 85vh;
  .form-container{
    gap:2rem;
    height:85vh;
    .form{
      padding:2rem;
      background-color: #000000b0r;
      width:25vw;
      gap:2rem;
      color:white;
      .container{
        gap:2rem;
        input{
          padding:0.5rem 1rem;
          width:15rem;
        }
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
  }
}`;
export default Login
