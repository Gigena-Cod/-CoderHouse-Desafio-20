const express = require('express')

const router = express.Router()

const path = require('path')

const moment = require('moment')

const Productos = require('../models/products')

const Mensajes = require('../models/messages')

const bodyParser = require('body-parser');

let server = require('../app')
const products = require('../models/products')
let admin = server.admin

// create application/x-www-form-urlencoded parser
router.use=bodyParser.urlencoded({ extended: true })



cargarItems = async () => {
     productos = await Productos.find({})   
}

newItem = async (prod) => {
    newProduct= await new Productos(prod)
    await newProduct.save()
}


    
cargarMessages = async () => {
    
     mensajes = await Mensajes.find({})   
     
}

newMessage = async (msj) => {
    
    newMessage= await new Mensajes(msj)
    newMessage.save() 
   
}




// PAGE PRINCIPAL
router.get('/list',async (req,res) => { 
    
    try {
        await cargarItems()
        if(productos.length===0){
            res.status(200).send({Mensaje:`No existen productos registrados`})
        }

        res.status(200).send({Productos:productos})
    
        
    } catch (error) {
        res.status(200).send({Error:`productos`})
    }
        

})

//POST
router.post('/add',async (req,res) => {
   

     try {
        await newItem(req.body) 
        await cargarItems()  
        
         res.status(200)
         res.send({Mensaje:`Producto:${req.body.nombre} registrado correctamente.`})
         
     } catch (error) {
        res.status(204).
        res.send({Error:`Producto no registrado correctamente.`})
     }
         
  
        
})

// DELETE 
router.delete('/delete/:id',async (req,res)=>{
    try {
         //OBTENEMOS EL ID
         const {id} = req.params  

         await Productos.findByIdAndDelete(id)
         
         res.status(200).send({Mensaje:`Producto eliminado correctamente.`})    
        
    } catch (error) {

        res.status(500).send({Error:`No se ha podido eliminar el producto correctamente.`})  
        
    }      
                       
})

// UPDATE  
router.put('/update/:id',async (req,res)=>{
             console.log('Entre al put')
          try {
              //OBTENEMOS EL ID         
             const {id} = req.params  

             //OBTENEMOS PRODUCTO
             const product = await Productos.findById(id)  
                  

             //UPDATES--SET VALORES 
              product.nombre = req.body.nombre 
              product.precio=req.body.precio 
              product.stock=req.body.stock 
              product.descripcion=req.body.descripcion

              try {
                  //GUARDAMOS CAMBIOS
                await  product.save()  

                
                res.status(200).send({Mensaje:`Producto:${product.nombre} actualizado correctamente.`})  
                  
              } catch (error) {
              
                res.status(204).send({Error:`Producto:${product.nombre} no se ha podido guardar correctamente.`}) 
              }
              
          } catch (error) {
            res.status(204).send({Error:`Producto:${product.nombre} no se ha podido actualizar correctamente.`}) 
              
          }     
                       
})

//   -----------------------------------------------
//  ------------          CHAT             ---------
router.get('/chat',async (req,res) => {
     try {
         await cargarMessages()
        res.status(200) 
        if(mensajes.length===0)   {
            res.send({Mensaje:`No existen mensajes para visualizar.`}) 
        }
        res.send({Mensajes:mensajes})
         
     } catch (error) {
         res.status(204)
         res.send({Error:`No se ha podido visualizar los mensajes correctamente.`})
     }
    
})

router.post('/chat/add', async (req,res) => {
    try {
        let time = moment().format(); 
        const  addNewMessage = {autor:req.body.autor,
                            mensaje:req.body.mensaje,
                            now:moment(time).format('DD/MM/YYYY HH:mm')}    

        await newMessage(addNewMessage)

        res.status(200)
        res.send({Mensaje:`Nuevo mensaje registrado.`})
    } catch (error) {
        res.status(204).send({Error:`No se ha podido registrar correctamente el mensaje.`}) 
            
    }
  
    
})

module.exports=router