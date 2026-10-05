import express, { json } from 'express'
import mongoose from 'mongoose'
import { fakeAuthHandler } from './middlewares/fakeAuthHandler'
import { errorsHandler } from './middlewares/errorsHandler'
import { notFoundHandler } from './middlewares/notFoundHandler'
import usersRouter from './routes/users'
import cardsRouter from './routes/cards'

mongoose.connect('mongodb://localhost:27017/mestodb')

const app = express()

app.use(json())

app.use(fakeAuthHandler)

app.use('/users', usersRouter)
app.use('/cards', cardsRouter)
app.use(notFoundHandler)

app.use(errorsHandler)

app.listen(3000)
