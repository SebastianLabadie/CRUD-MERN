const {Schema,model} = require('mongoose');

const noteSchema = new Schema({
    title:String,
    content:{
        type:String,
        required:true
    },
    author:String,
    date:{
        type:Date,
        default:Date.now
    }
},  {timestamps:true}) //timestamp es una propiedad, que agrega 2 atributos fecha de creacion
                        //y fecha de actualizacion 

                         //crea la colletion note
module.exports= model('Note',noteSchema)