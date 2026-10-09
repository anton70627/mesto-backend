import dotenv from 'dotenv'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { errorsHandler } from './middlewares/errorsHandler'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { createUserValidate, loginValidate } from './validators/authValidate'
import { createUser, login } from './controllers/users'
import { auth } from './middlewares/auth'
import { errorLogger, requestLogger } from './middlewares/logger'
import routes from './routes'

dotenv.config()
mongoose.connect('mongodb://localhost:27017/mestodb')

const app = express()

app.use(json())
app.use(cookieParser())
app.use(requestLogger)

// Роуты, не требующие авторизации
app.post('/signin', loginValidate, login)
app.post('/signup', createUserValidate, createUser)

app.use(auth)

// Роуты, которым необходима авторизация
app.use(routes)
app.use(notFoundHandler)

app.use(errorLogger)
app.use(errorsHandler)

app.listen(3000)
