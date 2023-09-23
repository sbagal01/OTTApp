import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Main from './pages/Main.jsx';
import Player from './pages/Player.jsx';
import Movies from './pages/Movies.jsx';
import TVShows from './pages/TVShows.jsx';
import UserLiked from './pages/UserLiked.jsx';
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Main/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path="/player" element={<Player/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/mylist" element={<UserLiked />} />
      <Route exact path="/tv" element={<TVShows />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
