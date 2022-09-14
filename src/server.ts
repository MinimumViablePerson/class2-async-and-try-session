import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

const port = 5678

// production-ready code
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.send(users)
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found.' })
    }
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })
    res.send(user)
  } catch (error) {
    res.status(400).send({ error: error })
  }
})

app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body })
    res.send(user)
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`)
})
