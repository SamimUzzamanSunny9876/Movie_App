
import './css/App.css'
import { Route, Routes } from 'react-router-dom';
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import Favourite from './pages/Favourite';
import NavBar from './components/NavBar';





function App() {

  return (
   
    <main className='main-content'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/favourite' element={<Favourite/>}></Route>

      </Routes>
    </main>

  );
}

export default App
