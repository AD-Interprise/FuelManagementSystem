const mongoose = require('mongoose');





//connecting database to
 const uri = 'mongodb+srv://fuel1234:fuel12345@cluster0.szxyq.mongodb.net/fuleManager?retryWrites=true&w=majority'
 module.exports=mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true},(rr)=>{

    if(!rr){
        console.log('DB Connected')
    }else{
        console.log('OOPS!!!! FAIL TO CONNECT TO DB',rr);
    }


    
})



