import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.webp';
import Slider from '../components/Slider.jsx';
import {useSelector} from 'react-redux';
import {getGenres,fetchMovies} from '../store/index.js'
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {FaPlay} from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import styled from 'styled-components';
function Main() {
  const [isScrollable,setIsScrollable]=useState(false);
  let genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
  let movies=useSelector((state)=>state.netflix.movies);
   
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
      if(genresLoaded){
        dispatch(fetchMovies({type:"all"}));
        console.log(movies);
      }
  },[genresLoaded])

  useEffect(()=>{
    dispatch(getGenres());
  },[])
  window.onscroll=()=>{
    console.log("Scrolled before"+isScrollable);
    setIsScrollable(window.scrollY===0?false:true)
    console.log("Scrolled after"+isScrollable);
    return ()=>(window.onscroll=null)
  };

  return (
    <Container>
      <Navbar isScrollable={isScrollable} />
      <div className="hero">
        <div className="logo">
        <img src={backgroundImage} alt="background" className="background-image" />
      </div>
      <div className="container">
        <div className="logo">
          <img src={MovieLogo} alt="Movie Logo" />
        </div>
        <div className="buttons flex">
          <button className="flex j-center a-center" onClick={()=>navigate('/player')}>
          <FaPlay/> Play            
          </button>
          <button className="flex j-center a-center">
          <AiOutlineInfoCircle/> More Info            
          </button>
        </div>
      </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  )
}
const Container=styled.div`
  background-color: black;
  .hero{
    position:relative;
    .background-image{
      filter:brightness(70%);
    }
    img{
      height:100vh;
      width:100vw;
    }
    .container{
      position:absolute;
      bottom:5rem;
      .logo{
        img{
          width:100%;
          height:100%;
          margin-left:5rem;

        }
      }
      .buttons{
          margin:5rem;
          gap:2rem;
          button{
            font-size:1.4rem;
            gap:1rem;
            border-radius:0.2rem;
            padding:0.5rem;
            padding-left:2rem;
            padding-right:2.4rem;
            border:none;
            cursor:pointer;
            transition:0.2s ease-in-out;
            &:hover{
              opacity:0.8;
            }
            &:nth-of-type(2) {
              background-color:rgba(109,109,110,0.7)
              color:white;
              svg{
                font-size:1.8rem;
              }

            }
          }
      }
    }
  }
`;
export default Main
