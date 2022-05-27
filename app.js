const connectDB = require('./db/connect')
const express = require('express')
const app = express()

const tasks = require('./routes/tasks')
const notFound = require('./middleware/notfound')

const errorHandlerMiddleware = require('./middleware/errorHandler')

require('dotenv').config()

// middleware
app.use(express.json())

app.use(express.static('./public'))

// route
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        })        
    } catch (error) {
        console.log(error)
    }
}

start()







// app.get('/api/v1/tasks')         -get all
// app.post('/api/v1/tasks')        - create
// app.get('/api/v1/tasks/:id')     - get task
// app.patch('/api/v1/tasks/:id')   - update
// app.delete('/apu/v1/tasks/:id')  - delete