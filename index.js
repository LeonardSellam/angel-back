const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');



app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/events', (req, res) => {
    console.log(req)
    res.send('Hello World!')
  })

app.get('/event', (req, res) => {
console.log(req)
res.send(JSON.stringify({ a: 1 }))
})
  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})