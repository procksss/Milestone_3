const ConnectToMongo = require('./db');
const express = require('express');

ConnectToMongo();

const app = express()
const port = 5000

var cors = require('cors')
 
app.use(cors())

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/items', require('./Routes/items'))
app.use('/api/allitems', require('./Routes/allitems'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})