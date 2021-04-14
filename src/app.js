const path=require('path')

const express = require('express')
const app= express()

const morgan=require('morgan')




//SETTINGS
app.set('port',3000)


//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

//IMPORTS ROUTES
const index = require('./routes/index.js')

//ROUTES
app.use('/api',index)



//STARTING SERVER
app.listen(app.get('port'),() => {
    console.log(`Running on port ${app.get('port')}`)
})


