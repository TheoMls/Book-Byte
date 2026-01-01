const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')
require('dotenv').config()

connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const bookRoutes = require('./routes/books.routes')
const courseRoutes = require('./routes/courses.routes')

// Mount routes
app.use('/api/books', bookRoutes)
app.use('/api/courses', courseRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})