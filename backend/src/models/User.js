const {Schema,model} = require('mongoose');

const  userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true, //limpia el username para que no tenga espacios repetidos, que quede bonito
        unique:true //que no haya usernames repetidos
    },

},  {timestamps:true}) //timestamp es una propiedad, que agrega 2 atributos fecha de creacion
                        //y fecha de actualizacion 

                    //crea la colletion user
module.exports= model('User',userSchema)