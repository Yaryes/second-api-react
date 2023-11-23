import { useState } from "react"
export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'a38a99cd7e90e8f35de37bb98559f678'
    const [pelicula, setPelicula] = useState('')
    const [movies, setMovies] = useState([])
    const handleInputChange = (e) => {
        setPelicula(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${pelicula}&api_key=${API_KEY}`)
            const data = await response.json()
            console.log(data.results);

            setMovies(data.results)
        } catch(error) {
            console.error('A ocurrido un error: ', error)
            
        }
    }
  return (
    <div className="container">
      <h1 className="title">Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Escribe la Pelicula"
          value={pelicula}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      <div className="movie-list">
        {movies.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

