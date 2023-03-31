const express = require('express')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))


// routers
const memberRouter = require('./routes/memberRouter.js')
app.use('/api/member', memberRouter)

const settingsRouter = require('./routes/settingsRouter.js')
app.use('/api/member', settingsRouter)


// ports
const PORT = process.env.PORT || 8080


// server
app.listen(PORT, () => {
    console.log(`port ${PORT}, server is running`)
})