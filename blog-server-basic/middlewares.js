import express from 'express'
import cookieValidator from './cookieValidator.js'
import cookieParser from 'cookie-parser'

const port = 3000
const app = express()



// const myLogger = (req, res, next) => {

//     console.log('LOGGED')
//     next();
// }
// app.use(myLogger)

// const requestTime = (req, res, next) => {
//     req.requestTime = Date.now()
//     next()
// }
// app.use(requestTime)

// app.get('/', (req, res) => {

//     let responseText = 'Hello World!<br>'
//     responseText += `<small>Requested at : ${req.requestTime}</small>`
//     res.send(responseText)

// })

const validateCookies = async (req, res, next) => {
    await cookieValidator(req.cookies)
    next()
  }
  app.use(cookieParser())
  app.use(validateCookies)
  
  // error handler
  app.use((err, req, res, next) => {
    res.status(400).send(err.message)
  })

app.listen(port)