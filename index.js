const express = require('express')
const dotenv = require('dotenv')
const app = express()

const mongoose = require('mongoose')

//middleware
app.use(express.json())
dotenv.config()

//import routes
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')
const productRoute = require('./routes/product')

const database = process.env.MONGO_URI
mongoose
  .connect(database)
  .then(() => console.log('e don connect o'))
  .catch((err) => console.log(err))
//Route middleware
app.use('/api/user', authRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/user/product', productRoute)

app.listen(5000, () => {
  console.log('Server is up and running on Port 5000')
})
