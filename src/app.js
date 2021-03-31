const path=require('path')

const express = require('express')
const app= express()

const morgan=require('morgan')
const db = require('./database/database')

let admin = true;

module.exports={ admin }


//SETTINGS
app.set('port',3000)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

//IMPORTS ROUTES
const index = require('./routes/index.js')

//ROUTES
app.use('/',index)
db.conectar()


//STARTING SERVER
app.listen(app.get('port'),() => {
    console.log(`Running on port ${app.get('port')}`)
})


