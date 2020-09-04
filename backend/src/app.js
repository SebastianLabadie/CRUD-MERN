const express=require('express');
const cors = require('cors');
const app=express();

//settings -->variables de a usar 
app.set('port',process.env.PORT || 4000 );

//middlewares -->funciones que se ejecutan antes de llegar a las rutas 
app.use(cors());
app.use(express.json())

//routes

app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))

module.exports=app;