const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

const PORT = process.env.PORT ?? 1234
//Como hacer un middleware con express de forma nativa
//app.use(express.json())
//Como hacer un middleware desde 0
//El middlewae es una función que se ejecuta entre la petición y la respuesta
app.use((req, res, next) => {
  if(req.method !== 'POST') return next()
  if(req.headers['content-type'] !== 'application/jason') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString 
  })

  req.on('end', ()=> {
    const data = JSON.parse(body)
    //mutar la request y guardar la info en req.body
    res.body=data
    next()
  })
})

app.get('/pokemon/ditto', (req,res)=>{
  res.json(ditto)
})

app.post('/pokemon', (req, res)=>{
  res.status(201).json(req.body)
})

//forma global de tratar las request - error
app.use((req, res)=>{
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, ()=>{
  console.log(`server listening on port http://localhost:${PORT}`);
})