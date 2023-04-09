const express = require('express')
const cors = require('cors')
const RM = require('./config/responseMessages.js')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routers
const memberRouter = require('./routes/memberRouter.js')
app.use('/api/member', memberRouter)

const settingsRouter = require('./routes/settingsRouter.js')
app.use('/api/member', settingsRouter)

// ports
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
  console.log(RM['001'], PORT)
})
