import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'; 
import {getGenres,fetchMovies} from '../store/index';
import Slider from '../components/Slider.jsx';
import NotAvailable from '../components/NotAvailable.jsx';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import {firebaseAuth} from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import SelectGenre from '../components/SelectGenre.jsx';
function Movies() {
    const [isScrollable,setIsScrollable]=useState(false);
    let genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
    let movies=useSelector((state)=>state.netflix.movies);
     let genres=useSelector((state)=>state.netflix.genres);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(genresLoaded){
          dispatch(fetchMovies({type:"movie"}));
          console.log(movies);
        }
    },[genresLoaded])
  
    useEffect(()=>{
      dispatch(getGenres());
    },[])
    window.onscroll=()=>{
      
      setIsScrollable(window.scrollY===0?false:true)
      
      return ()=>(window.onscroll=null)
    };
    onAuthStateChanged(firebaseAuth,(currentUser)=>{

    })

    return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrollable} />
      </div>

      <div className="data">
      <SelectGenre genres={genres} type={"movie"}/>
        {
            movies.length? <Slider movies={movies} />: <NotAvailable />
        }
      </div>
    </Container>
  )
}
const Container=styled.div`
    .data{
        margin-top:8rem;
        .not-available{
            text-align:center;
            color:white;
            margin-top:4rem;
        }
    }
`;
export default Movies
