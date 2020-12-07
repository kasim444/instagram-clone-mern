import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import dbModel from './dbModel'

// app config
const app = express()
const port = process.env.PORT || 8080

// middlewares
app.use(express.json())
app.use(cors())

// DB confid
const connection_url =
  'mongodb+srv://admin:DPBSyUqPcAV4uvOd@cluster0.qjdqs.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
  console.log('DB Connected')
})

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/upload', (req, res) => {
  const body = req.body
  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/sync', (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`))
