const express = require('express');
const db=require('./db')
const app=express();

//requiring routes
const userRoute=require('./routers/userRoutes')
const pumpRoute=require('./routers/pumpRouts')


app.use(express.json());
app.set('view engine', 'ejs');

//passing routes
app.use('/user',userRoute);
app.use('/pump',pumpRoute);

app.get('/', (req,res)=>{
 
  console.log('server created')
  res.render('index')

});


PORT=3000;
app.listen(PORT,()=>console.log(`server s runnig on port ${PORT}`));




//https://medium.com/@ibraheemabukaff/find-nearest-locations-with-mongodb-how-to-2d6d84d0266f