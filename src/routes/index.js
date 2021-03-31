const express = require('express')

const router = express.Router()

const path = require('path')

const moment = require('moment')

const Productos = require('../models/products')

const Mensajes = require('../models/messages')

const bodyParser = require('body-parser');

let server = require('../app')
let admin = server.admin

// create application/x-www-form-urlencoded parser
router.use=bodyParser.urlencoded({ extended: false })





cargarItems = async () => {
     productos = await Productos.find({})   
}

newItem = async (prod) => {
    newProduct= await new Productos(prod)
    await newProduct.save()
}

deleteItem = async (cod) => {
    try {
        
    await Productos.deleteOne({codigo:cod})
    await console.log('Object deleted')
    } catch (error) {
        console.log('Error the Object deleted')
    }
    
}
    
cargarMessages = async () => {
     mensajes = await Mensajes.find({})     
     
}

newMessage = async (msj) => {
    newMessage= await new Mensajes(msj)
    await newMessage.save()
   
}


// PAGE GENERAL
router.get('/',(req,res) => {
    res.render('main',{'admin':admin})
})


// CHANGE ADMIN
router.get('/admin',async (req,res) => {
    if(admin){
        admin = false;
        res.redirect('/productos')
    }
    else{
        admin = true; 
        res.redirect('/productos')      
    }   
    
})

// PAGE PRINCIPAL
router.get('/productos',async (req,res) => { 
    
    if(admin === true){
        await cargarItems()    
        await res.render('./layouts/products_admin',{'productos': productos,'admin':admin})
    }else{
        await cargarItems()    
        await res.render('./layouts/productos',{'productos': productos,'admin':admin})
    }   

})

router.post('/productos/add',async (req,res) => {

     await newItem(req.body)     

     if(admin == true){
        await cargarItems()    
        await res.redirect('/productos') 
    }else{
        await cargarItems()    
        await res.redirect('/productos') 
    }
        
})

// DELETE (disponible para administradores) 
router.get('/borrar/:codigo',async (req,res)=>{
    try {
         //OBTENEMOS EL ID
         const {codigo} = req.params  

         deleteItem(codigo)
         res.redirect('/productos')    
        
    } catch (error) {

        console.log(error)
        
    }      
                       
})

// FORM-UPDATE (disponible para administradores) 
router.get('/editar-form/:cod',async (req,res)=>{
    try {
         //OBTENEMOS EL ID
         const {cod} = req.params  
         const product = await Productos.find({ codigo:cod})          
         await res.render('./layouts/edit',{'Producto': product }) 
        
    } catch (error) {

        console.log(error)
        
    }      
                       
})

// UPDATE (disponible para administradores) 
router.post('/editar/:id',async (req,res)=>{
    try {
         //OBTENEMOS EL ID
         
         const {id} = req.params  
         const product = await Productos.findById(id)

       

          product.nombre = req.body.nombre 
          product.precio=req.body.precio 
          product.stock=req.body.stock 
          product.descripcion=req.body.descripcion
          console.log(product)
          product.save()        
          res.redirect('/productos') 
        
    } catch (error) {

        console.log(error)
        
    }      
                       
})
    //   ---------------------------------------------
    //   CHAT
router.get('/chat',async (req,res) => {
    await cargarMessages()
    await res.render('./layouts/messages',{'mensajes':mensajes})
})

router.post('/chat/add', async (req,res) => {
    let time = moment().format(); 
    const  addNewMessage = {autor:req.body.autor,
                        mensaje:req.body.mensaje,
                        now:moment(time).format('DD/MM/YYYY HH:MM:SS')}    
    await newMessage(addNewMessage)
    res.redirect('/chat')
})

module.exports=router