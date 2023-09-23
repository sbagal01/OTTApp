import {useNavigate} from 'react-router-dom'; 
import {getGenres,fetchMovies, getUserLikedMovies} from '../store/index';
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import Slider from '../components/Slider.jsx';
import NotAvailable from '../components/NotAvailable.jsx';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import {firebaseAuth} from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import SelectGenre from '../components/SelectGenre.jsx';

export default function UserLiked() {
    const [isScrollable,setIsScrollable]=useState(false);
    let genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
    let movies=useSelector((state)=>state.netflix.movies);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let [email,setEmail]=useState(undefined);
    
  
    useEffect(()=>{
      if(email){
        dispatch(getUserLikedMovies(email));
      }
    },[email])
    window.onscroll=()=>{
      
      setIsScrollable(window.scrollY===0?false:true)
      
      return ()=>(window.onscroll=null)
    };
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser){
            setEmail(currentUser.email);
        }else{
            navigate('/login');
        }
    })

    return (
    <Container>
        <Navbar isScrollable={isScrollable} />
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {movies.map((movie,index)=>{
                    return <Card movieData={movie} index={index} isLiked={true} key={movie.id} />
                })}
            </div>
        </div>
    </Container>
  )
}
const Container=styled.div`
    .content{
        margin:2.3rem;
        margin-top:8rem;
        gap:3rem;
        h1{
            margin-left:3rem;
        }
        .grid{
            flex-wrap:wrap;
            gap:1rem;
        }
    }
`;