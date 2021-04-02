const mongoose = require('mongoose')
const Schema= mongoose.Schema

const messageSchema = new Schema({    
    autor: String,
    mensaje: String,
    now: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
)
const mensajes=module.exports = mongoose.model('mensajes',messageSchema)