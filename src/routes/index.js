const express = require('express')
const router = express.Router()


const bodyParser = require('body-parser');

let server = require('../app')

// create application/x-www-form-urlencoded parser
router.use=bodyParser.urlencoded({ extended: true })

const normalizr = require("normalizr")
const util =require('util');

const normalizar= normalizr.normalize
const desnormalizar= normalizr.denormalize
const schema = normalizr.schema


const { v4: uuidv4 } = require('uuid');

//DEFINIMOS UN NUEVO ESQUEMA DE USUARIOS
const autor = new schema.Entity('user',)

//DEFINIMOS UN NUEVO ESQUEMA TEXTO
const mensaje = new schema.Entity('text')

//DEFINIMOS UN NUEVO ESQUEMA DE MENSAJE
const message = new schema.Entity('message',{    
    autor:autor,
    mensaje:mensaje})


function print(myObj){
    console.log(util.inspect(myObj,false,12,true))
}
let data=[]


loadMessages = async () => {     
     
        
    return dataNormalize         
}

newMessage = async (mess) => {
    
    newMessage= await new Mensajes(mess)
    newMessage.save() 
   
}
//   -----------------------------------------------
//  ------------          CHAT             ---------
router.get('/chat',async (req,res) => {
     try {
               
        res.status(200) 
        if(!data)   {
            res.send({Mensaje:`No existen mensajes para visualizar.`}) 
        }
        let dataNormalize=normalizar(data,[message]) 
        let dataDesnormalize=normalizar(data,[message])
        const tamDataDesnormalizada=JSON.stringify(dataDesnormalize).length 
        const tamDataNormalizada=JSON.stringify(dataNormalize).length 
       
        res.send({Mensajes:`Compresion:${tamDataDesnormalizada-tamDataNormalizada}`,Data:dataDesnormalize})
         
     } catch (error) {
         res.status(204)
         res.send({Error:`No se ha podido visualizar los mensajes correctamente.`})
     }
    
})

router.post('/chat/add', async (req,res) => {
    try {
       console.log(req.body)
        const  addNewMessage = {id:uuidv4(),
                                autor: {id:req.body.id,
                                        nombre: req.body.nombre,
                                        apellido: req.body.apellido,
                                        edad: req.body.edad,
                                        alias: req.body.alias,
                                        avatar: req.body.avatar},
                                mensaje:req.body.mensaje
                                } 
       
        data.push(addNewMessage)
        res.status(200)
        res.send({Mensaje:`Nuevo mensaje registrado.`})
    } catch (error) {
        res.status(204).send({Error:`No se ha podido registrar correctamente el mensaje.`})             
    }
    
})

module.exports=router