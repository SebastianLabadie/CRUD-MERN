const mongoose = require('mongoose');

const URI=process.env.MONGODB_URI ? process.env.MONGODB_URI: 'mongodb+srv://sebastian:es2Sr0MuPAcDVfbK@cluster0.dov3k.mongodb.net/Cluster0?retryWrites=true&w=majority';

try {
    
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });
} catch (error) {
    console.log(error)
}

const connection=mongoose.connection;

connection.once('open',() =>{
    console.log('DB is connected')
})