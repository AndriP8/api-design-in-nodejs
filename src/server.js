import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import config from './config'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
import userRouter from './resources/user/user.router'
import { protect, signin, signup } from './utils/auth'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Router and Sub Router
router.get('/me', (req, res) => {
  res.send({ message: 'hello me' })
})
app.use('/api', router)
//

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/item', itemRouter)
app.use('/api/user', userRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
