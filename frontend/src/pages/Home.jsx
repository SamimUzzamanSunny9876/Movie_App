import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import "../css/Home.css"
import { getPopularMovies, searchMovies} from "../services/api";

function Home()
{
  
  const [searchQuery, setSearchQuery] = useState()
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() =>{
    const loadPopularMoives = async()=>{
      try{
        const popularMoives = await getPopularMovies();
        setMovies(popularMoives)
      }catch(err)
      {
        console.log(err)
        setError("Cannot Load Movies")
      }
      finally{
        setLoading(false);
  
      }
    }
      loadPopularMoives()
  } , [])

  
   
  

  const handleSearch = async (e)=>{
    e.preventDefault();
    if(!searchQuery.trim()) return;
    if(loading) return;

    setLoading(true)
    try{
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults);
      setError(null)

    }catch(err){
      console.log(err)
      setError("Failed to load the page")

    }finally{
      setLoading(false)
    }
    
  }

  return <div className="home">
    <form onSubmit={handleSearch} className="search-form">
      <input  type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
      <button className="search-button">Submit</button>

    </form>
    {error && <div className="error">{error}</div>}

    {loading? <div className="loading">Loading.....</div>:<div className="movies-grid">
      {
        movies.map((movie)=> 
         (<MovieCard movie ={movie} key={movie.id}/>))
      }
     </div> }
     

  </div>
}
export default Home