import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import dbModel from './dbModel.js'

// app config
const app = express()
const port = process.env.PORT || 8080
const pusher = new Pusher({
  appId: '1119419',
  key: '3804a9c7c83fd5cb3e1c',
  secret: 'bd8e525fcc4d7d3d6d51',
  cluster: 'eu',
  useTLS: true,
})

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
  const changeStream = mongoose.connection.collection('posts').watch()

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const postDetails = change.fullDocument
      pusher.trigger('posts', 'inserted', {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      })
    } else {
      console.log('unknown rigger from pusher')
    }
  })
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
  dbModel
    .find((err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
    .sort({ _id: -1 })
})

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`))
