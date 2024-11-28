const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
const cors = require('cors'); 
// const cors = require("cors")
// Connect to MongoDB   
mongoDB()
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
 // Enables CORS for all origins

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
 app.use('/api',require("./Routes/CreateUser"))
 app.use('/api',require("./Routes/DisplayData"))
 app.use('/api',require("./Routes/OrderData"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})