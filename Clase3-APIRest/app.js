//REST = arquitectura de Software (comunicación en red) para construir API
//simplicidad, escalabilidad, portabilidad, fiabilidad, fácil de modificar y visibilidad
//cada recurso se identifica con una url

const express = require('express')
const cors = require('cors');
const movies = require('./movies.json')
const crypto = require('crypto')
const app = express()

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

const { validateMovie, validatePartialMovie } = require('./schemas/movies')


app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: 'Hola mundo'})
})

//Recuperar todas las películas
app.get('/movies', (req, res) => {
  res.json(movies)
})

//Recuperar una película por id
app.get('/movies:id', (req, res) => { 
  const {id} = req.params
  const movie = movies.find(movie => movie.id === id)
  if(movie) return res.json(movie)
  res.status(404).json({message: 'Movie not found'})
})

//Recuperar una película por un género
//Filtro que estamos pasando por queryString
app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),//generamos la id
    ...result.data //datos validados
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

//path-to-regexp => convertir path complejos en expresiones regulares

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Servidor escuchando por el puerto http://localhost:${PORT}`);
})